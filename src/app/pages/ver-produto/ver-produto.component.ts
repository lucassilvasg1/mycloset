import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActionSheetController, LoadingController, ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/produto/product';
import { Subscription } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-ver-produto',
  templateUrl: './ver-produto.component.html',
  styleUrls: ['./ver-produto.component.scss'],
})
export class VerProdutoComponent implements OnInit, OnDestroy {

  private loading: any;
  public products = new Array<Product>();
  private productsSubscription: Subscription;
  public productUserId : string;

  constructor(
    private loadingCtrl: LoadingController,
    private productService: ProductService,
    private toastCtrl: ToastController,
  ) {
  }

  ngOnInit() { 
    // this.productsSubscription = this.productService.getProducts(this.productUserId).subscribe(data => {
    //   this.products = data;
    // });
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }


  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  verProduto()
  {
    this.productsSubscription = this.productService.getProducts(this.productUserId).subscribe(data => {
      this.products = data;
    });
  }
  
}