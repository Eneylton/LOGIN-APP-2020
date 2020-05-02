import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage({})
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  nome: string = "";
  sobrenome: string = "";
  telefone: string = "";
  email: string = "";
  usuario: string = "";
  senha: string = "";
  confirma: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  cadastrar() {

    if(this.nome ==""){
      
      const toast = this.toastyCrtl.create({
      message: 'O campo nome é Obrigatório',  
      duration:3000
      });
      toast.present();
    

  }else if(this.telefone ==""){

      const toast = this.toastyCrtl.create({
      message: 'O campo Telefone é Obrigatório',  
      duration:3000
      });
      toast.present();

  }else if(this.email ==""){
      
      const toast = this.toastyCrtl.create({
      message: 'O campo Email é Obrigatório',  
      duration:3000
      });
      toast.present();


  }else if(this.usuario ==""){

      const toast = this.toastyCrtl.create({
      message: 'O campo usuario é Obrigatório',  
      duration:3000
      });
      toast.present();

  }else if(this.senha ==""){

      const toast = this.toastyCrtl.create({
      message: 'O campo Senha é Obrigatório',  
      duration:3000
      });
      toast.present();

  }else if(this.senha != this.confirma){

      const toast = this.toastyCrtl.create({
      message: 'A senha que você Digitou está diferente !',  
      duration:3000
      });
      toast.present();

  }else{

    let body = {

      

      nome: this.nome,
      sobrenome: this.sobrenome,
      telefone: this.telefone,
      email: this.email,
      usuario: this.usuario,
      senha: this.senha,

      crud: 'adicionar'
    };

    this.serve.postData(body, 'servidor.php').subscribe(data => {

      this.showInsertOk();
    });

  }

  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Seu Cadastro efetuado com sucesso',
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
