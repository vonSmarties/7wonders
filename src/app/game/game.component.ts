import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game:any
  private unsubscribeFollow: any;

  constructor(public api:ApiService) { }

  ngOnInit() {
    this.followLead()
  }

  followLead(){
    this.unsubscribeFollow = this.api.getStatusGame().onSnapshot( doc => {
      this.game = doc.data()
      console.log(this.game)
      if(doc.data().status == 'start'){}
    })
  }

}
