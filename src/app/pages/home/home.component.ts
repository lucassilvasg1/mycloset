import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActionSheetController, LoadingController, ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/produto/product';
import { Subscription } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  private loading: any;
  public products = new Array<Product>();
  private productsSubscription: Subscription;
  imagemData: any;
  croppedImagepath = "";

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private productService: ProductService,
    private toastCtrl: ToastController,
    private camera: Camera, 
    private crop: Crop,
    private file: File,
    private webview: WebView,
    private actionSheetController: ActionSheetController,
  ) {
    this.productsSubscription = this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

  async logout() {
    await this.presentLoading();

    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async deleteProduct(id: string) {
    try {
      await this.productService.deleteProduct(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  
  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 60,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 600,
      targetWidth: 600,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      this.imagemData = imageData;
      this.cropImage(imageData)
    }, (err) => {
    });
  }

  cropImage(fileUrl) {
    this.crop.crop(fileUrl, { quality: 50 })
      .then(
        newPath => {
          this.showCroppedImage(newPath.split('?')[0])
        },
        error => {
          alert('Error cropping image' + error);
        }
      );
  }

  async showCroppedImage(ImagePath) {

    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    const tempBaseFilesystemPath = ImagePath.substr(0, ImagePath.lastIndexOf('/') + 1);
    const newBaseFilesystemPath = this.file.dataDirectory;

    await this.file.readAsDataURL(filePath, imageName).then(async (base64) => {
      this.croppedImagepath = base64;
      base64 = base64.replace(/^data:image\/[a-z]+;base64,/, "");


      this.imagemData = base64
      // this.file.copyFile(tempBaseFilesystemPath, imageName, newBaseFilesystemPath, newFileName);
    }, error => {
      alert('Error in showing image' + error);
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Carregar da Biblioteca',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Usar Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }
}