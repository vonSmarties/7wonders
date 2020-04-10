import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { LobbyComponent } from './lobby/lobby.component';
import { GameComponent } from './game/game.component';


const routes: Routes = [
  { path:'', component: ListComponent },
  { path:'lobby', component: LobbyComponent},
  { path:'game', component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
