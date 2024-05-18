import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { authGuard } from './guards/auth.guard';
import { SubidaComponent } from './components/subida/subida.component';
import { DescargasComponent } from './components/descargas/descargas.component';
import { PlaylistComponent } from './components/playlist/playlist.component';

const routes: Routes = [
  {path: 'canciones',component: HomeComponent},
  {path:'page-not-found',component:PageNotFoundComponent},
  {path: '',component: HomeComponent},
  {path: 'descargar',component: DescargasComponent,canActivate:[authGuard]},
  {path:"**",redirectTo: "/page-not-found", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
