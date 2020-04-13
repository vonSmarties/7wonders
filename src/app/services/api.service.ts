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

  constructor(private router:Router) {
    this.db = firebase.firestore()
    this.namePlayer = 'rageQuiter'
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
      players: firebase.firestore.FieldValue.arrayUnion({ name:this.namePlayer, id:this.idPlayer, master:false })  
    })
    this.router.navigateByUrl('game')
  }

  leaveGame(){
    if (this.idGame){
      this.db.collection('games').doc(this.idGame).update({
        players: firebase.firestore.FieldValue.arrayRemove({name:this.namePlayer, id:this.idPlayer, master:false })
      })
      this.idGame = null
    }
    this.router.navigateByUrl('')
  }

  createGame(){
    this.db.collection('games').add({
      players:[{ name:this.namePlayer, id:this.idPlayer, master:true }],
      status:'unstart'
    }).then(doc => {
      this.idGame = doc.id
      this.router.navigateByUrl('game')
    })
  }

  deleteGame(){
    this.db.collection('games').doc(this.idGame).delete()
    this.idGame = null
    this.router.navigateByUrl('')
  }

  getStatusGame(){
    return this.db.collection('games').doc(this.idGame)
  }
}
