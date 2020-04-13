import { Injectable } from '@angular/core';
import 'firebase/firestore'
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private db:firebase.firestore.Firestore
  public idPlayer:string
  public namePlayer:string
  public idGame:string
  public master:boolean

  constructor(private router:Router) {
    this.db = firebase.firestore()
    this.namePlayer = 'rageQuiter'
    this.master = false
    this.getIdPlayer()
    // this.getIdGame()
  }

  private async getIdPlayer(){
    const id = await localStorage.getItem('idPlayer')
    if ( id ){
      this.idPlayer = id
    } else {
      this.idPlayer = Math.random().toString()
      localStorage.setItem('idPlayer', this.idPlayer )
    }
  }

  private async getIdGame(){
    const id = await localStorage.getItem('idGame')
    if ( id ){
      this.idGame = id
      this.db.collection('games').doc(id).get()
    }
  }

  scoutUnstartGame(){
    return this.db.collection('games').where('status', '==', 'unstart')
  }

  joinGame(id:string){
    this.idGame = id
    this.db.collection('games').doc(id).update({
      players: firebase.firestore.FieldValue.arrayUnion({ name:this.namePlayer, id:this.idPlayer, master:this.master })  
    })
    this.router.navigateByUrl('game')
  }

  leaveGame(id:string){
    this.db.collection('games').doc(id).update({
      players: firebase.firestore.FieldValue.arrayRemove({name:this.namePlayer, id:this.idPlayer })
    })
    this.idGame = null
  }

  createGame(){
    this.db.collection('games').add({
      players:[{ name:this.namePlayer, id:this.idPlayer, master:this.master }],
      status:'unstart'
    }).then(doc => {
      this.idGame = doc.id
      this.router.navigateByUrl('game')
    })
  }

  getStatusGame(){
    return this.db.collection('games').doc(this.idGame)
  }
}
