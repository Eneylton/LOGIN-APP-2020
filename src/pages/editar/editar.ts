import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-editar',
  templateUrl: 'editar.html',
})
export class EditarPage {

  id:        number;
  nome:      string ="";
  sobrenome: string ="";
  telefone:  string ="";
  email:     string ="";
  login:     string ="";
  senha:     string ="";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private serve: ServiceProvider) {
  
    
  
  }

  ionViewDidLoad() {

    this.id        = this.navParams.get('id');
    this.nome      = this.navParams.get('nome');
    this.sobrenome = this.navParams.get('sobrenome');
    this.telefone  = this.navParams.get('telefone');
    this.email     = this.navParams.get('email');
    this.login     = this.navParams.get('login');
    this.senha     = this.navParams.get('senha');


  }

  editar(){

    let body ={
      id:        this.id,
      sobrenome: this.sobrenome,
      nome:      this.nome,
      telefone:  this.telefone,
      email:     this.email,
      login:     this.login,
      senha:     this.senha,
   
      crud: 'editar'
    };

    this.serve.postData(body, 'servidor.php').subscribe(data =>{
    
      this.showInsertOk();
    
    });
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Seu Registro foi Atualizado',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('ListarPage')
          }
        }
      ]
    });
    alert.present();
  }

  }


