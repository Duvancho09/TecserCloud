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

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "", component: SidebarComponent,
        children: [
            { path: "home", component: HomeComponent },
            { path: "profile", component: ProfileComponent },
            { path: "register-car", component: RegisterCarComponent },
            { path: "sales", component: SalesComponent },
            { path: "buyparts", component: BuyPartsComponent },
            { path: "registers-cars", component: RegistersCarsComponent },
            { path: "inventary", component: InventaryComponent }
        ]
     },
     { path: "**", redirectTo: "" }
];
