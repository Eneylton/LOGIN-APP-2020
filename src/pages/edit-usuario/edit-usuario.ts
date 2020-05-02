import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Storage } from '@ionic/Storage';


@IonicPage({})
@Component({
  selector: 'page-edit-usuario',
  templateUrl: 'edit-usuario.html',
})
export class EditUsuarioPage {

  log: any;
  nome: string;
  email: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    private storage: Storage,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.storage.get('session_storage').then((res)=>{

      this.log = res;
      this.nome = this.log.nome;
      this.email = this.log.email;
    

    });
  }

  selectText(event){
    event.target.Select();
  }

  salvar(){

    let body = {
      nome: this.nome, 
      email: this.email,
      id: this.log.id,
      crud: 'profile_edit' 
    }

    this.serve.postData(body, 'servidor.php').subscribe(data => {
    
      this.log.nome = this.nome;
      this.log.email = this.email;
      this.storage.set('session_storage', this.log);

      this.navCtrl.push('ContactPage');

      const toast = this.toastyCrtl.create({
        message:'Atualização Realizada !!',
        duration:3000
      });
      toast.present();
      

    });

  }

}
