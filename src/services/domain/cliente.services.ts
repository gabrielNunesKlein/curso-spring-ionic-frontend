import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../models/cliente.dto";
import { ImageUtilService } from "../image-util.service";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {

    constructor(public httpCliente: HttpClient, public storage: StorageService, 
        public imageUtilService: ImageUtilService){
    }

    findById(id: string): Observable<ClienteDTO>{
        return this.httpCliente.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/${id}`)
    }

    findByEmail(email: string){
        return this.httpCliente.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`)
    }

    getImageFromBuket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.httpCliente.get(url, {responseType: 'blob'})
    }

    insert(obj: ClienteDTO){
    return this.httpCliente.post(`${API_CONFIG.baseUrl}/clientes`, obj, {
        observe: 'response',
        responseType: 'text'
    })
    }

    uploadPicture(picture){
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture)
        let formData: FormData = new FormData()
        formData.set('file', pictureBlob, 'file.png')

        return this.httpCliente.post(`${API_CONFIG.baseUrl}/clientes/picture`, formData, {
            observe: 'response',
            responseType: 'text'
        })
    }
}