import { Component } from '@angular/core';
import { menuItems } from '../../constants/admin.constant';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  menuItems = menuItems;
}