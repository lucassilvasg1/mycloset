import { VerProdutoComponent } from './ver-produto.component';
import { Camera } from '@ionic-native/camera/ngx';
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
    RouterModule.forChild([
      {
        path: '',
        component: VerProdutoComponent
      }
    ])
  ],
  declarations: [VerProdutoComponent],
  entryComponents: [],
})
export class VerProdutoModule { }
