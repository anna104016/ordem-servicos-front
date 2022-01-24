import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar-com/navbar.component';

const navbarRoutes: Routes = [
    { path: '', component: NavbarComponent },
    { path: 'dashboard', component: DashboardComponent}
];

@NgModule({
    imports: [RouterModule.forChild(navbarRoutes)],
    exports: [RouterModule]
})
export class NavbarRoutingModule {}
