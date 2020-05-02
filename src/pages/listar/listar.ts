import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage({})
@Component({
  selector: 'page-listar',
  templateUrl: 'listar.html',
})
export class ListarPage {

  limit: number = 10;
  start: number = 0;

  lojas: any = [];
  todos: Array<{id:any, nome: string, email: string, telefone: string}>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private serve: ServiceProvider) {
  }

  ionViewDidLoad() {
    this.lojas = [];
    this.start = 0;
    this.listarusuario();
  }

  formadd(){

    this.navCtrl.push('CadastroPage');
  }

  editar(id, nome, sobrenome, telefone, email, login, senha){

    this.navCtrl.push('EditarPage', {
      id:         id,
      nome:       nome,
      sobrenome:  sobrenome,
      telefone:   telefone,
      email:      email,
      login:      login,
      senha:      senha,

    })

  }

  doRefresh(event) {

    setTimeout(() => {

      this.ionViewDidLoad();
      event.complete();

    }, 1000);
  }

  loadData(event: any) {
    this.start += this.limit;

    setTimeout(() => {
      this.listarusuario().then(() => {
        event.complete();
      })
    }, 1000);
  }


  listarusuario() {

    return new Promise(resolve => {
      let body = {
        limit: this.limit,
        start: this.start,
        crud: 'listar-paramentro'
      };
      this.serve.postData(body, 'servidor.php').subscribe(data => {
        for (let i = 0; i < data.result.length; i++) {

          this.lojas.push({
            id: data.result[i]["id"],
            nome: data.result[i]["nome"],
            sobrenome: data.result[i]["sobrenome"],
            telefone: data.result[i]["telefone"],
            email: data.result[i]["email"],
            login: data.result[i]["login"],
            senha: data.result[i]["senha"],
          });

        }

        resolve(true);

        this.todos = this.lojas;

      });
    });
  }

  getLojas(ev: any) {
    
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.lojas = this.todos.filter((loja) => {
        return (loja.nome.toLowerCase().indexOf(val.toLowerCase()) > -1)
               || (loja.email.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.lojas = this.todos;
    }
  }


  delete(id){
    let body = {
      id: id,
      crud:'deletar'}
   
    this.serve.postData(body, 'servidor.php').subscribe(data =>{
      this.showInsertOk();
    });

  }

  conta(id, nome, sobrenome, telefone, email, login, senha){

    this.navCtrl.push('ContaPage', {
      id:         id,
      nome:       nome,
      sobrenome:  sobrenome,
      telefone:   telefone,
      email:      email,
      login:      login,
      senha:      senha,

    })

  }



  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Registro Excluido',
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
