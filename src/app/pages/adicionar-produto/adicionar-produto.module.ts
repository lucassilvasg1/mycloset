import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdicionarProdutoComponent } from './adicionar-produto.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdicionarProdutoComponent
      }
    ])
  ],
  declarations: [AdicionarProdutoComponent],
  entryComponents: []
})
export class AdicionarProdutoModule { }
