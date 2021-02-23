import { ProdutoDTO } from "./Produto.dto";

export interface CartItem{
    quantidade: number;
    produto: ProdutoDTO;
}