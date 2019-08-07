import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EpicComponent } from './EPIC/epic.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CuriosityComponent } from './curiosity/curiosity.component';

const routes: Routes = [
  { path: 'epic', component: EpicComponent },
  { path: 'curiosity', component: CuriosityComponent },
  { path: '**', component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
