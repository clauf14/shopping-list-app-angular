import { Component } from '@angular/core';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';

@Component({
  selector: 'app-root',
  imports: [ShoppingListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shopping-list-app';
}
