import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({})
@Component({
  selector: 'page-conta',
  templateUrl: 'conta.html',
})
export class ContaPage {

  id:        number;
  nome:      string ="";
  sobrenome: string ="";
  telefone:  string ="";
  email:     string ="";
  login:     string ="";
  senha:     string ="";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    this.id = this.navParams.get('id');
    this.nome = this.navParams.get('nome');
    this.sobrenome = this.navParams.get('sobrenome');
    this.telefone = this.navParams.get('telefone');
    this.email = this.navParams.get('email');
    this.login = this.navParams.get('login');
    this.senha = this.navParams.get('senha');

    console.log(this.id);

  }

}
