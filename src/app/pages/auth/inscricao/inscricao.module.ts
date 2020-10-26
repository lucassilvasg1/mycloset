import { ComponentsModule } from './../../../components/components.module';
import { InscricaoComponent } from './inscricao.component';
import {NgxMaskIonicModule} from 'ngx-mask-ionic'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    NgxMaskIonicModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: InscricaoComponent
      }
    ])
  ],
  declarations: [InscricaoComponent]
})
export class InscricaoModule { }
