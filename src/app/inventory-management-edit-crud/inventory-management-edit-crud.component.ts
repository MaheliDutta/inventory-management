import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FetchInventoryDataList } from '../models/fetch-inventory-data.model';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-inventory-management-edit-crud',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './inventory-management-edit-crud.component.html',
  styleUrls: ['./inventory-management-edit-crud.component.scss'],
})
export class InventoryManagementEditCrudComponent {
  category_name: any;
  product_price: any;
  quantity: any;
  value: any;

  constructor(
    private dialogRef: MatDialogRef<InventoryManagementEditCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public product_data: FetchInventoryDataList
  ) {}

  ngOnInit() {
    this.category_name = this.product_data.category;
    this.quantity = this.product_data.quantity;
    this.value = this.product_data.value;
    this.product_price = this.product_data.price;
  }

  onProductPriceChange(event: string) {
    this.product_price = event;
  }
  onProductCategoryChange(event: string) {
    this.category_name = event;
  }
  onProductQuantityChange(event: number) {
    this.quantity = event;
  }
  onProductValueChange(event: string) {
    this.value = event;
  }

  onClickSave() {
    const res = {
      name: this.product_data.name,
      category: this.category_name
        ? this.category_name
        : this.product_data.category,
      value: this.value ? this.value : this.product_data.value,
      quantity: this.quantity,
      price: this.product_price ? this.product_price : this.product_data.price,
    };
    this.dialogRef.close(res);
  }
}
