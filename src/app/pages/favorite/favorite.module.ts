import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { FavoriteComponent } from './favorite.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: FavoriteComponent
      }
    ]),
    IonicStorageModule.forRoot(),
  ],
  declarations: [FavoriteComponent],
  entryComponents: [],
  providers: []
})
export class FavoriteModule { }
