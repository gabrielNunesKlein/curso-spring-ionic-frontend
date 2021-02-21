import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CidadeService } from '../../services/domain/cidade.services';
import { EstadoService } from '../../services/domain/estado.services';
import { SingnupPage } from './singnup';


@NgModule({
  declarations: [
    SingnupPage,
  ],
  imports: [
    IonicPageModule.forChild(SingnupPage),
  ],
  providers: [
    CidadeService,
    EstadoService
  ]
})
export class SingnupPageModule {}
