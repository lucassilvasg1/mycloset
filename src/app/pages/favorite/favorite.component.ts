import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Contacts, Contact, ContactName, ContactField } from '@ionic-native/contacts';
import { ModalController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario/usuario';
import { StorageService } from 'src/app/services/storage.service';
import { Contato } from 'src/app/models/contato/contato';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {

  myContacts: Contato[];
  usuarioLogado: Usuario;

  allContacts: Contact[];

  constructor(private service: StorageService,
    public modalController: ModalController,
    private callNumber: CallNumber,
    public toastController: ToastController,
    private contacts: Contacts,
  ) { }

  async ngOnInit() {

    this.usuarioLogado = JSON.parse(window.localStorage.usuario_logado);
    this.myContacts = this.usuarioLogado.listaContatos;
  }


  call(contato: Contato) {
    let options = {
      filter: '',
      multiple: true,
      hasPhoneNumber: true
    };
    this.contacts.find(['*'], options).then((contacts: Contact[]) => {
      this.allContacts = contacts;
    });

    let i = this.allContacts.findIndex(x => x.phoneNumbers[0].value == contato.telefone);
    this.callNumber.callNumber(this.allContacts[i].phoneNumbers[0].value, true);
  }


}
