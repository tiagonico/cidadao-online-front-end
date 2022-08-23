import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "src/config/api.config";
import { JwtHelper } from "angular2-jwt";
import { CredenciaisDTO } from "src/app/models/credenciais.dto";
import { LocalUser } from "src/app/models/local_user";
import { StorageService } from "../storage.service";


@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();
    
    constructor(public http: HttpClient,public storage: StorageService) {
    }

    authenticate(creds : CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue : string) {
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            cpf: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
    }

    refreshToken() {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`, 
            {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    logout() {
        
        this.storage.setLocalUser(null);
    }
}