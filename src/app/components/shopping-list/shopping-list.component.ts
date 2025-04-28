import { Component } from '@angular/core';
import { ShoppingItem } from '../../models/shopping-item';
import { ShoppingService } from '../../services/shopping.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ShoppingListComponent {
  items: ShoppingItem[] = [];
  newItem: ShoppingItem = { id: 0, name: '', quantity: 1, unit: 'pcs' };
  editMode: boolean = false;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.items = this.shoppingService.getItems();
  }

  addItem(): void {
    if (this.newItem.name.trim()) {
      const existingItem = this.items.find(item => item.name.toLowerCase() === this.newItem.name.toLowerCase());
  
      if (existingItem) {
        existingItem.quantity += this.newItem.quantity;
        this.shoppingService.updateItem(existingItem);
      } else {
        this.shoppingService.addItem({ ...this.newItem });
      }
  
      this.newItem = { id: 0, name: '', quantity: 1, unit: 'pcs' };
      this.loadItems();
    }
  }
  
  toggleCompleted(item: ShoppingItem): void {
    this.shoppingService.updateItem(item);
  }  

  editItem(item: ShoppingItem): void {
    this.editMode = true;
    this.newItem = { ...item };
  }

  updateItem(): void {
    this.shoppingService.updateItem(this.newItem);
    this.newItem = { id: 0, name: '', quantity: 1, unit: 'pcs'};
    this.editMode = false;
    this.loadItems();
  }

  deleteItem(id: number): void {
    this.shoppingService.deleteItem(id);
    this.loadItems();
  }
}
