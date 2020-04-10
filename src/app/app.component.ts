import { Component } from '@angular/core';
import { configFirebase } from '../../configFirebase';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'jambon';

  constructor(){
    firebase.initializeApp(configFirebase)
  }
}
