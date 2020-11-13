import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservaFormComponent } from './reserva/reserva-form/reserva-form.component';
import { ReservaListComponent } from './reserva/reserva-list/reserva-list.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserListComponent
  },
  {
    path: 'user/new',
    component: UserFormComponent
  },
  {
    path: 'reserva',
    component: ReservaListComponent
  },
  {
    path: 'reserva/new',
    component: ReservaFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
