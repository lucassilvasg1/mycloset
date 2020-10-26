import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { Observable, } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  public uploadPercent : Observable<number>;
  public downloadUrl : Observable<string>;

  constructor(private camera : Camera, private file: File, private afStorage : AngularFireStorage,
              private authService : AuthService) {}

  ngOnInit() {}

  async pickImage(sourceType) {
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
    const fileURI : string = await this.camera.getPicture(options);
    let file : string = fileURI.substring(fileURI.lastIndexOf('/') + 1, fileURI.indexOf('?'));

    const path : string = fileURI.substring(0, fileURI.lastIndexOf('/'));

    const buffer : ArrayBuffer = await this.file.readAsArrayBuffer(path, file);
    const blob : Blob = new Blob([buffer] , {type : 'image/jpeg'});

    this.uploadPicture(blob);

  }

  uploadPicture(blob : Blob)
  {
    const ref = this.afStorage.ref('teste.jpg')
    const task = ref.put(blob);


  }
}
