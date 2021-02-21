import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingnupPage } from './singnup';

@NgModule({
  declarations: [
    SingnupPage,
  ],
  imports: [
    IonicPageModule.forChild(SingnupPage),
  ],
})
export class SingnupPageModule {}
