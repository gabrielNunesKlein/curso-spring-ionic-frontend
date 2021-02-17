import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDto } from "../../models/Categoria.dto"

@Injectable()
export class CategoriaService {
    constructor(public http: HttpClient){
    }

    findAll(): Observable<CategoriaDto[]> {
        return this.http.get<CategoriaDto[]>(`${API_CONFIG.baseUrl}/categorias`)
    }
}