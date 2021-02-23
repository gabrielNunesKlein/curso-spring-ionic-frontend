import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/Produto.dto';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoService } from '../../services/domain/produto.services';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})

export class ProdutoDetailPage {

  item: ProdutoDTO

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let produto_id = this.navParams.get('produto_id')
    this.produtoService.findById(produto_id).subscribe(Response => {
      this.item = Response
      this.getImageIfExist()
    }, error => {})
  }

  getImageIfExist(){
    this.produtoService.getImageFromBucket(this.item.id).subscribe(Response => {
      this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`
    }, error => {})
  }
}
