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
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { DialogUserComponent } from './components/dialog-user/dialog-user.component';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "", component: SidebarComponent,
        children: [
            { path: "home", component: HomeComponent,  },
            { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
            { path: "register-car", component: RegisterCarComponent, canActivate: [AuthGuard] },
            { path: "sales", component: SalesComponent, canActivate: [AuthGuard] },
            { path: "buyparts", component: BuyPartsComponent, canActivate: [AuthGuard] },
            { path: "registers-cars", component: RegistersCarsComponent, canActivate: [AuthGuard] },
            { path: "inventary", component: InventaryComponent,  },
            { path: "partesDialog", component: ParteDialogComponent, canActivate: [AuthGuard] },
            { path: "registerUser", component: RegisterUserComponent, canActivate: [AuthGuard] },
            { path: "dialogUser", component: DialogUserComponent, canActivate: [AuthGuard] }
        ]
     },
     { path: "**", redirectTo: "" }
];
