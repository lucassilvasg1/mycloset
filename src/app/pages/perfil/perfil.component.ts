import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ListResult } from '@angular/fire/storage/interfaces';
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
  private uid : any;

  constructor(private camera : Camera, private file: File, private afStorage : AngularFireStorage,
              private authService : AuthService) {}

  async ngOnInit() {
    this.uid = await this.authService.getAuth();

    this.downloadUrl = this.afStorage.ref(`${this.uid}/perfil/perfil.jpg`).getDownloadURL();
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
      const file: string = fileURI.substring(fileURI.lastIndexOf('/') + 1, fileURI.length);
      const path: string = fileURI.substring(0, fileURI.lastIndexOf('/'));

      const blobInfo: any = await this.makeFileIntoBlob(imageData);
      const randomId = Math.random().toString(36).substring(2, 8);
      this.uploadPicture(blobInfo.imgBlob, randomId, file);
    }, (err) => {
    });

  }

  async uploadPicture(blob : Blob, randomId : string, file : string)
  {
    const ref = this.afStorage.ref(`${this.uid}/perfil/perfil.jpg`);
    const uploadTask = ref.put(blob);

    uploadTask.snapshotChanges().pipe(finalize(() => {
      this.downloadUrl = ref.getDownloadURL();
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
