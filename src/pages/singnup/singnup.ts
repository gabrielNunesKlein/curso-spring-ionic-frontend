import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CidadeDTO } from '../../models/Cidade.dto';
import { EstadoDTO } from '../../models/Estado.dto';
import { CidadeService } from '../../services/domain/cidade.services';
import { EstadoService } from '../../services/domain/estado.services';

@IonicPage()
@Component({
  selector: 'page-singnup',
  templateUrl: 'singnup.html',
})
export class SingnupPage {

  formGroup: FormGroup
  estados: EstadoDTO[]
  cidades: CidadeDTO[]

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public formBuilder: FormBuilder, public cidadeService: CidadeService, public estadoService: EstadoService) {

    this.formGroup = this.formBuilder.group({
      nome: ['Joaquin', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['Joaquin@gmail.com', [Validators.required, Validators.email]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['123', [Validators.required]],
      logradouro: ['Rua Vila', [Validators.required]],
      numero: ['25', [Validators.required]],
      complemento: ['Apto 3', []],
      bairro: ['Copacabana', []],
      cep: ['10858333', [Validators.required]],
      telefone1: ['977261827', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    })
  }

  ionViewDidLoad(){
    this.estadoService.findAll().subscribe(Response =>{
      this.estados = Response
      this.formGroup.controls.estadoId.setValue(this.estados[0].id)
      this.updateCidades()
    }, error => {});
  }

  updateCidades(){
    let estado_id = this.formGroup.value.estadoId
    this.cidadeService.findAll(estado_id).subscribe(Response => {
      this.cidades = Response
      this.formGroup.controls.cidadeId.setValue(null)
    }, error => { })
  }

  signupUser(){
    console.log('Enviou o form')
  }
}
