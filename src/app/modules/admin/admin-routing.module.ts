import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryComponent } from './components/category/category.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProductComponent } from './components/product/product.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path : '',
    component : AdminLayoutComponent,
    children:[
      { path:'',redirectTo:'dashboard',pathMatch: 'full' },
      { path:'dashboard',component:DashboardComponent },
      { path:'category',component:CategoryComponent },
      { path:'product',component:ProductComponent },
      { path:'settings',component:SettingsComponent },
    ]
  },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }