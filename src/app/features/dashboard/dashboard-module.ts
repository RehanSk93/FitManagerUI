import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { Dashboard } from './dashboard';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { ReceptionistDashboard } from './components/receptionist-dashboard/receptionist-dashboard';
import { TrainerDashboard } from './components/trainer-dashboard/trainer-dashboard';


@NgModule({
  declarations: [
    Dashboard,
    AdminDashboard,
    ReceptionistDashboard,
    TrainerDashboard
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
