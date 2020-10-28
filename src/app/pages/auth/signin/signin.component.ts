import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormComponent } from 'src/app/components/form/form.component';
import { Usuario } from 'src/app/models/usuario/usuario';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent extends FormComponent implements OnInit {

  entity: Usuario;
  lista: Usuario[];

  constructor(private service: AuthService, 
              private router: Router,
              private loadingController: LoadingController,
              public toastController: ToastController) {
    super();
  }

  ngOnInit() {
    this.entity = new Usuario();
  }

  async submit(formulario: any) {
    await this.presentLoading();
    try {
      await this.service.login(this.entity);
      this.router.navigate(['/home']);
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loadingController.dismiss();
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

}
