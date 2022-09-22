import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modulos/login/login.component';
import { MiRutaAprendizComponent } from './pages/mi-ruta-aprendiz/mi-ruta-aprendiz.component';
import { ResultadoDelCursoComponent } from './pages/resultado-del-curso/resultado-del-curso.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent},
  { path: 'mi-ruta', component: MiRutaAprendizComponent},
  { path: 'resumen/:id', component: ResultadoDelCursoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
