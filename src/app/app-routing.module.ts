import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { InicioSesionComponent } from './Componentes/inicio-sesion/inicio-sesion.component';
import { PerfilComponent } from './Componentes/perfil/perfil.component';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { DetallesComponent } from './Componentes/detalles/detalles.component';
import { VigilanteGuard } from './Guard/vigilante.guard';
import { ListaComponent } from './Componentes/lista/lista.component';

const routes: Routes = [
  //componenetes para crear los datos del usuario, usarlos, leerlos y poder actualizarlos
  {path: 'registro', component: RegistroComponent},
  {path: 'InicioSesion', component: InicioSesionComponent},
  {path: 'Perfil', component: PerfilComponent,  canActivate:[VigilanteGuard]},


//Componente de inicio
  {path: 'inicio', component: InicioComponent, canActivate:[VigilanteGuard]},
  {path: 'detalles/:id', component: DetallesComponent,  canActivate:[VigilanteGuard]},
  {path: 'lista', component: ListaComponent},






  {path: '', component: InicioSesionComponent, pathMatch: 'full'},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

