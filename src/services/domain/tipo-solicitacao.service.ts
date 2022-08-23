import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Observable";
import { TipoSolicitacaoDTO } from "src/app/models/tipo-solicitacao.dto";
import { TipoSolicitacaoNewDTO } from "src/app/models/tipo-solicitacao-new.dto";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class TipoSolicitacaoService {

    constructor(public http: HttpClient,public imageUtilService: ImageUtilService) {
    }

    insert(obj: TipoSolicitacaoNewDTO)  {
        return this.http.post(
            `${API_CONFIG.baseUrl}/tipo-solicitacao`, 
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
            `${API_CONFIG.baseUrl}/tipo-solicitacao/image`, 
            formData,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    findAll() : Observable<TipoSolicitacaoDTO[]>  {
        return this.http.get<TipoSolicitacaoDTO[]>(`${API_CONFIG.baseUrl}/tipo-solicitacao`);
    }

    deletar(id:number) {
        return this.http.delete(`${API_CONFIG.baseUrl}/tipo-solicitacao/${id}`);
    }
}