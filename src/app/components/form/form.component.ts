import { FormGroup, FormArray } from '@angular/forms';

export abstract class FormComponent {
  listaUf = [];
  listaDia = [];

  constructor() { }

  abstract submit(formulario);

  onSubmit(formulario) {
    if (formulario.valid) {
      this.submit(formulario.form);
    }
    else {
      this.verificaValidacoesForm(formulario);
    }
  }

  verificaValidacoesForm(formulario) {
    Object.keys(formulario.form.controls).forEach(campo => {
      const controle = formulario.form.get(campo);
      controle.markAsDirty();
      controle.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  verificaValidDirty(campo) {
    return (!campo.valid && campo.dirty && campo.touched);
  }

  aplicaCssErro(campo) {
    return {
      'item-has-focus.ion-invalid': this.verificaValidDirty(campo)
    };
  }

  getUsuarioLogado() {
    return JSON.parse(localStorage.getItem("adminUsr"));
  }

  getCodigoUsuarioLogado() {
    return this.getUsuarioLogado().codigo;
  }
}