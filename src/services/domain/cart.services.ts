import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/Produto.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class CartService{

    constructor(public storage: StorageService){
    }

    createOrClearCart(): Cart{
        let cart: Cart = {item: []}
        this.storage.setCart(cart)
        return cart
    }

    getCart(): Cart{
        let cart: Cart = this.storage.getCart()
        if(cart == null){
            cart = this.createOrClearCart()
        }
        return cart
    }

    addProduto(produto: ProdutoDTO): Cart{
        let cart = this.getCart()
        let position = cart.item.findIndex(x => x.produto.id == produto.id)
        if(position == -1){
            cart.item.push({quantidade: 1, produto: produto})
        }
        this.storage.setCart(cart)
        return cart
    }

    removeProduto(produto: ProdutoDTO): Cart{
        let cart = this.getCart()
        let position = cart.item.findIndex(x => x.produto.id == produto.id)
        if(position != -1){
            cart.item.splice(position, 1)
        }
        this.storage.setCart(cart)
        return cart
    }

    increaseQuantity(produto: ProdutoDTO): Cart{
        let cart = this.getCart()
        let position = cart.item.findIndex(x => x.produto.id == produto.id)
        if(position != -1){
            cart.item[position].quantidade++;
        }
        this.storage.setCart(cart)
        return cart
    }

    decreaseQuantity(produto: ProdutoDTO): Cart{
        let cart = this.getCart()
        let position = cart.item.findIndex(x => x.produto.id == produto.id)
        if(position != -1){
            cart.item[position].quantidade--;
            if(cart.item[position].quantidade < 1){
                cart = this.removeProduto(produto)
            }
        }
        this.storage.setCart(cart)
        return cart
    }

    total(): number{
        let cart = this.getCart()
        let sum = 0
        for(var i=0; i<cart.item.length; i++){
            sum += cart.item[i].produto.preco * cart.item[i].quantidade
        }
        return sum
    }
}