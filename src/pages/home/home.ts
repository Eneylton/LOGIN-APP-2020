import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, App } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Storage } from '@ionic/Storage';


@IonicPage({})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  log: any;
  usuarios: any;

  constructor(public navCtrl: NavController,
    private serve: ServiceProvider,
    private storage: Storage,
    public toastyCrtl: ToastController,
    public navParams: NavParams,
    private appCtrl: App,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    
    this.storage.get('session_storage').then((res)=>{

      this.log = res;
      this.load();

    });

  }

  load(){
    let body = {
      
      id: this.log.id,
      crud: 'profile'

    };

    this.serve.postData(body, 'servidor.php').subscribe(data => {
      
    this.usuarios = data.profiles;
      
    });
  }

openConta(){

  this.navCtrl.push('ContaPage');
}

logout(){
  this.storage.clear();
  this.appCtrl.getRootNav().setRoot('loginPage');
  const toast = this.toastyCrtl.create({
    message: 'Você Saiu !!!!',
    duration: 3000
  });

  toast.present();

}

}
