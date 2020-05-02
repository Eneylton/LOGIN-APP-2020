import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/Storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('content') nav: NavController;
  rootPage: any;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private storage: Storage) {

    this.initializeApp();
   }
   initializeApp(){
      this.platform.ready().then(()=>{
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  
    this.storage.get('session_storage').then((res)=>{

      if(res == null){

        this.rootPage = 'LoginPage';

      }else{
        this.rootPage = 'ContactPage';
      }

    })

}

}
