import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../models/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa : AngularFireAuth) { }

  login(user : Usuario)
  {
    return this.afa.signInWithEmailAndPassword(user.email, user.senha);
  }

  register(user : Usuario) {
    return this.afa.createUserWithEmailAndPassword(user.email, user.senha);
  }

  logout() {
    return this.afa.signOut();
  }

  getAuth() {
    return this.afa;
  }
}
