import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FormComponent } from 'src/app/components/form/form.component';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from './../../models/produto/product';

@Component({
  selector: 'app-adicionar-produto',
  templateUrl: './adicionar-produto.component.html',
  styleUrls: ['./adicionar-produto.component.scss'],
})
export class AdicionarProdutoComponent  extends FormComponent implements OnInit {

  entity: Product;
  public downloadUrl: Observable<string>;
  private uid: any;
  private blobInfo: any;
  private filename : any;
  public base64 : string;
  private nomeImagem : string;
  
  constructor(private service: ProductService,
              private router: Router,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private camera: Camera, 
              private file: File, 
              private afStorage: AngularFireStorage,
              private authService: AuthService,
              private navCtrl : NavController) { 
    super();
  }

  async ngOnInit() {
    this.entity = new Product();
    this.uid = await this.authService.getAuth();
  }

  async submit(formulario: any) {
    await this.presentLoading();
    try {
      this.entity.userId = this.uid;
      await this.uploadPictureAndSave(this.blobInfo.imgBlob);

    } catch (error) {
      this.presentToast(error.message);
    } finally {
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({ message : "Aguarde..."});
    return loading.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({ message, duration: 3000 });
    return toast.present();
  }


   // função para tirar foto da câmera, upload no storage do firebase e alterar foto de perfil do usuário
  async pickImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    }
    
    await this.camera.getPicture(options).then(async imageData => {
      const fileURI: string = imageData;
      this.filename = fileURI.substring(fileURI.lastIndexOf('/') + 1, fileURI.length);
      const path: string = fileURI.substring(0, fileURI.lastIndexOf('/'));

      this.blobInfo = await this.makeFileIntoBlob(imageData);

      await this.file.readAsDataURL(path, this.filename).then(async (base64) => {  
        this.base64 = base64;
      });    

    }, (err) => {
    });

  }

  async uploadPictureAndSave(blob : Blob)
  {
    this.nomeImagem = `${this.uid}/produtos/${new Date().getTime()}.jpg`;
    const ref = this.afStorage.ref(this.nomeImagem);
    const uploadTask = ref.put(blob);

    uploadTask.snapshotChanges().pipe(finalize(() => {
      ref.getDownloadURL().subscribe(async response => { 
        this.entity.linkImage = response;
        this.entity.createdAt = new Date().getTime();
        await this.service.addProduct(this.entity);

        this.navCtrl.navigateBack('/home'); 

        this.loadingController.dismiss();

      });

    })).subscribe();
  }

  // FILE STUFF
  makeFileIntoBlob(_imagePath) {
    return new Promise((resolve, reject) => {
      let fileName = "";
      this.file
        .resolveLocalFilesystemUrl(_imagePath)
        .then(fileEntry => {
          const { name, nativeURL } = fileEntry;
          const path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));
          fileName = name;
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          const imgBlob = new Blob([buffer], {
            type: "image/jpeg"
          });
          resolve({
            fileName,
            imgBlob
          });
        })
        .catch(e => reject(e));
    });
  }

}
