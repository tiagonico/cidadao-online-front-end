import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { UsuarioDTO } from "src/app/models/usuario.dto";

@Injectable()
export class UsuarioService {

    constructor(public http: HttpClient) {
    }

    insert(obj: UsuarioDTO)  {
        return this.http.post(
            `${API_CONFIG.baseUrl}/usuario`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

}