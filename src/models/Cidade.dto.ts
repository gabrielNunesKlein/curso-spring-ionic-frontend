import { EstadoDTO } from "./Estado.dto";

export interface CidadeDTO{
    id: string;
    nome: string;
    estado?: EstadoDTO;
}