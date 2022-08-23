import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Observable";
import { SolicitacaoNewDTO } from "src/app/models/solicitacao-new.dto";
import { SolicitacaoDTO } from "src/app/models/solicitacao.dto";
import { SolicitacaoPut } from "src/app/models/solicitacao-put";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class SolicitacaoService {

    constructor( public imageUtilService: ImageUtilService,public http: HttpClient) {
    }

    insert(obj: SolicitacaoNewDTO)  {
        return this.http.post(
            `${API_CONFIG.baseUrl}/solicitacao`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    put(id: number,obj: SolicitacaoPut)  {

        return this.http.put(
            `${API_CONFIG.baseUrl}/solicitacao/${id}`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    uploadPicture(picture,nameFile) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData : FormData = new FormData();
        formData.set('file', pictureBlob, nameFile);
        return this.http.post(
            `${API_CONFIG.baseUrl}/solicitacao/image`, 
            formData,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    findAll() : Observable<SolicitacaoDTO[]>  {
        return this.http.get<SolicitacaoDTO[]>(`${API_CONFIG.baseUrl}/solicitacao`);
    }

    search(filter: string) : Observable<SolicitacaoDTO[]>  {
        return this.http.get<SolicitacaoDTO[]>(`${API_CONFIG.baseUrl}/solicitacao?filter=${filter}`);
    }

    findByCpf(cpf: string) : Observable<SolicitacaoDTO[]>  {
        return this.http.get<SolicitacaoDTO[]>(`${API_CONFIG.baseUrl}/usuario/${cpf}/solicitacao`);
    }
}