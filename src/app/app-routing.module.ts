import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
     // canActivate: [ UsuarioGuard ]
     canLoad: [ UsuarioGuard ]
  },
  {
    path: 'alert',
    loadChildren: () => import('./pages/alert/alert.module').then( m => m.AlertPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'tarjeta',
    loadChildren: () => import('./pages/tarjeta/tarjeta.module').then( m => m.TarjetaPageModule)
  },
  {
    path: 'proyecto',
    loadChildren: () => import('./pages/proyecto/proyecto.module').then( m => m.ProyectoPageModule)
  },
  {
    path: 'solicitud',
    loadChildren: () => import('./pages/solicitud/solicitud.module').then( m => m.SolicitudPageModule)
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'modal',
    loadChildren: () => import('./pages/tarjeta/modal/modal.module').then( m => m.ModalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
