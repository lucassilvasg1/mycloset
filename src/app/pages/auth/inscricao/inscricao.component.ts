import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormComponent } from '../../../components/form/form.component';
import { Usuario } from './../../../models/usuario/usuario';

@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.component.html',
  styleUrls: ['./inscricao.component.scss'],
})
export class InscricaoComponent extends FormComponent implements OnInit {

  constructor(private service: AuthService,
    private router: Router,
    public toastController: ToastController,
    private loadingController: LoadingController) {
    super();
  }
  entity: Usuario;
  lista: Usuario[];

  ngOnInit() {
    this.entity = new Usuario();
  }

  async submit(formulario: any) {
    await this.presentLoading();
    try {

      await this.service.register(this.entity);
      this.router.navigate(['/landing']);

    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loadingController.dismiss();
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({ message: "Aguarde..." });
    return loading.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({ message, duration: 3000 });
    return toast.present();
  }
}
