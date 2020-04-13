import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public listGames:any[]
  private unsubscribeScout:any

  constructor(public api:ApiService) { }

  ngOnInit() {
    this.listGames = []
    this.scoutUnstartGames()
  }

  scoutUnstartGames(){
    this.unsubscribeScout = this.api.scoutUnstartGame()
      .onSnapshot( snapshot => {
        snapshot.docChanges().forEach(change => {
          if( change.type == 'added'){
            this.listGames.push({id:change.doc.id, data:change.doc.data()})
            console.log(this.listGames)
            console.log('catch it', {id:change.doc.id, data:change.doc.data()})
          }
          if( change.type == 'modified'){
            if( change.doc.data().start == true){
              const index = this.listGames.findIndex(game => game.id == change.doc.id)
              this.listGames.splice(index,1)
            }
          }
          if( change.type == 'removed'){
            const index = this.listGames.findIndex(game => game.id == change.doc.id)
            this.listGames.splice(index,1)            
          }
        })
      })
  }

  changeName(newName){
    this.api.namePlayer = newName
  }

  createGame(){
    this.api.createGame()
    this.unsubscribeScout()
  }
}
