import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { ListComponent } from './list/list.component';
import { LobbyComponent } from './lobby/lobby.component';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ListComponent,
    LobbyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
