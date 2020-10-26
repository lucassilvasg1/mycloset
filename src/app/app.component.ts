import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoadingController, MenuController, Platform, ToastController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { PagesService } from './services/pages.service';
import { StorageService } from './services/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuController: MenuController,
    private router: Router,
    private pagesService: PagesService,
    private service: AuthService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Get Menus For Side Menu
      this.appPages = this.pagesService.getPages();
      this.menuController.enable(true); // Make Sidemenu disable


    });


  }

  // Signout Button
   async signout() {
    await this.presentLoading();
    try {
      await this.service.logout();
      this.router.navigate(['/onbroading']);

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
