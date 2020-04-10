import { Injectable } from '@angular/core';
import 'firebase/firestore'
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private db:firebase.firestore.Firestore
  public idPlayer:string
  public namePlayer:string
  public idGame:string

  constructor() {
    this.db = firebase.firestore()
    this.namePlayer = 'rageQuiter'
    this.getIdPlayer()
    this.getIdGame()
  }

  async getIdPlayer(){
    const id = await localStorage.getItem('idPlayer')
    if ( id ){
      this.idPlayer = id
    } else {
      this.idPlayer = Math.random().toString()
      localStorage.setItem('idPlayer', this.idPlayer )
    }
  }

  async getIdGame(){
    const id = await localStorage.getItem('idGame')
    if ( id ){
      this.idGame = id
      this.db.collection('games').doc(id).get()
    }
  }

  joinGame(id:string){
    this.db.collection('games').doc(id).update({
      players: firebase.firestore.FieldValue.arrayUnion({ name:this.namePlayer, id:this.idPlayer })  
    })
    this.idGame = id
  }

  leaveGame(id:string){
    
  }

  createGame(){
    this.db.collection('games').add({
      players:[{ name:this.namePlayer, id:this.idPlayer }]
    })
  }
}
