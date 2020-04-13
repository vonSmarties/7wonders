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
      if(doc.exists){
        this.game = doc.data()
        // if(doc.data().status == 'start'){}
      } else {
        this.api.idGame = null
        this.unsubscribeFollow()
        this.api.leaveGame()
      }
    })
  }

  master(){
    const index = this.game.players.findIndex( player => player.id == this.api.idPlayer)
    return this.game.players[index].master
  }

  leaveGame(){
    this.unsubscribeFollow()
    if(this.master()){
      this.api.deleteGame()
    } else {
      this.api.leaveGame()
    }
  }

}
