import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentsModule } from './landing-page/material-components.module';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EpicComponent } from './EPIC/epic.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CuriosityComponent } from './curiosity/curiosity.component';
import { ApolloComponent } from './apollo/apollo.component';

@NgModule({
  declarations: [
    AppComponent,
    EpicComponent,
    LandingPageComponent,
    CuriosityComponent,
    ApolloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
