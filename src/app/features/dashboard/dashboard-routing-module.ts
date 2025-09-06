import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { ReceptionistDashboard } from './components/receptionist-dashboard/receptionist-dashboard';
import { TrainerDashboard } from './components/trainer-dashboard/trainer-dashboard';
import { RollGuard } from '../../core/guards/roll-guard';
import { Unauthorized } from '../unauthorized/unauthorized';

const routes: Routes = [
  { path: '', component: Dashboard }, // optional landing
  {
    path: 'admin',
    component: AdminDashboard,
    canActivate: [RollGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'receptionist',
    component: ReceptionistDashboard,
    canActivate: [RollGuard],
    data: { roles: ['receptionist'] }
  },
  {
    path: 'trainer',
    component: TrainerDashboard,
    canActivate: [RollGuard],
    data: { roles: ['trainer'] }
  },
  { path: 'unauthorized', component: Unauthorized },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
