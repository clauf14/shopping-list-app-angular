import { Injectable } from '@angular/core';
import { ShoppingItem } from '../models/shopping-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private items: ShoppingItem[] = [];
  private nextId = 1;

  constructor() {}

  getItems(): ShoppingItem[] {
    return this.items;
  }

  addItem(item: ShoppingItem): void {
    item.id = this.nextId++;
    this.items.push(item);
  }

  updateItem(updatedItem: ShoppingItem): void {
    const index = this.items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      this.items[index] = updatedItem;
    }
  }

  deleteItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }
}
