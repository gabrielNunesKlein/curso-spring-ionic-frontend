import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/Endereco.dto';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.services';
import { ClienteService } from '../../services/domain/cliente.services';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})

export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public cartService: CartService, public clienteService: ClienteService) {

    this.pedido = this.navParams.get('pedido')
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().item

    this.clienteService.findById(this.pedido.cliente.id).subscribe(Response => {
      this.cliente = Response as ClienteDTO;
      this.endereco = this.findEndereco(this.pedido.ederecoDeEntrega.id, Response['enderecos'])
    }, error => {
      this.navCtrl.setRoot('HomePage')
    })
  }

  private findEndereco(id: string, list: EnderecoDTO[]): EnderecoDTO{
    let position = list.findIndex(x => x.id == id)
    return list[position]
  }

  total(): number{
    return this.cartService.total()
  }
}