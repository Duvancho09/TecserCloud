import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterCarComponent } from './components/register-car/register-car.component';
import { SalesComponent } from './components/sales/sales.component';
import { BuyPartsComponent } from './components/buy-parts/buy-parts.component';
import { RegistersCarsComponent } from './components/registers-cars/registers-cars.component';
import { InventaryComponent } from './components/inventary/inventary.component';
import { ParteDialogComponent } from './components/parte-dialog/parte-dialog.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "", component: SidebarComponent,
        children: [
            { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
            { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
            { path: "register-car", component: RegisterCarComponent, canActivate: [AuthGuard] },
            { path: "sales", component: SalesComponent, canActivate: [AuthGuard] },
            { path: "buyparts", component: BuyPartsComponent, canActivate: [AuthGuard] },
            { path: "registers-cars", component: RegistersCarsComponent, canActivate: [AuthGuard] },
            { path: "inventary", component: InventaryComponent, canActivate: [AuthGuard] },
            { path: "partesDialog", component: ParteDialogComponent, canActivate: [AuthGuard] }
        ]
     },
     { path: "**", redirectTo: "" }
];
