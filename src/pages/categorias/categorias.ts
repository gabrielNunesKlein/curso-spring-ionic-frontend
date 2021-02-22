import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CategoriaDto } from '../../models/Categoria.dto';
import { CategoriaService } from '../../services/domain/categoria.services';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl

  items: CategoriaDto[] 

  constructor(public navCtrl: NavController, public navParams: NavParams, 
      public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll().subscribe(Response => {
          console.log(Response)
          this.items = Response
    },
    error => { }
    
    )
  }

  showProdutos(categoria_id: string){
    this.navCtrl.push('ProdutosPage', {categoria_id: categoria_id})
  }

}
