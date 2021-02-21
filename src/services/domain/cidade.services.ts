import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { CidadeDTO } from "../../models/Cidade.dto";

@Injectable()
export class CidadeService{

    constructor(public http: HttpClient){
    }

    findAll(id: string): Observable<CidadeDTO[]>{
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${id}/cidades`)
    }
}