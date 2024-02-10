import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FetchInventoryDataList } from '../models/fetch-inventory-data.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TABLE_COLUMNS } from '../constant/display-columns';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { InventoryManagementEditCrudComponent } from '../inventory-management-edit-crud/inventory-management-edit-crud.component';

@Component({
  selector: 'app-inventory-management-list',
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
  ],
  providers: [MatSnackBar],
  templateUrl: './inventory-management-list.component.html',
  styleUrls: ['./inventory-management-list.component.scss'],
})
export class InventoryManagementListComponent implements OnInit {
  isUserToggle: any;
  errorSubject: Subject<string> = new Subject<string>();
  inventoryList: FetchInventoryDataList[] = [];

  displayedColumns = TABLE_COLUMNS;
  color = 'grey';
  totalProduct: number = 0;
  totalStoreValue: number = 0;
  outOfStock: number = 0;
  numberOfCategory: number = 0;
  disableRow: boolean = false;

  visibility_toggle: boolean = false;
  disabledRowIndex: number = 0;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchInventoryData();
  }
  fetchInventoryData() {
    this.http
      .get<FetchInventoryDataList[]>(
        'https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory'
      )
      .toPromise()
      .then((response) => {
        if (response !== undefined) {
          this.inventoryList = response;
          this.calculateTotals();
        }
      })
      .catch((error) => {
        const errorMessage = error.statusText;
        this.snackBar.open(errorMessage, 'Close', {
          duration: 5000,
        });
      });
  }


  calculateTotals() {
    this.totalProduct = 0;
    this.totalStoreValue = 0;
    this.outOfStock = 0;
    this.numberOfCategory = 0;
    this.totalProduct = this.inventoryList.length;

    this.inventoryList.forEach((item) => {
      if (item.price !== undefined && item.quantity !== undefined) {
        const price = parseFloat(item?.price.replace('$', ''));
        this.totalStoreValue += price * item?.quantity;
      }
    });

    const uniqueCategories = new Set(
      this.inventoryList.map((item) => item.category)
    );
    this.numberOfCategory = uniqueCategories.size;

    this.outOfStock = this.inventoryList.filter(
      (item) => item.quantity == 0
    ).length;
  }

  toggleUserType() {
    this.isUserToggle = !this.isUserToggle;
  }
  onClickDelete(index: number) {
    const deleteSuccessMessage = 'Product deleted successfully';
    this.snackBar.open(deleteSuccessMessage, 'Close', {
      duration: 5000,
    });
    this.removeElementFromInventory(index);
    this.calculateTotals();
  }

  removeElementFromInventory(index: number) {
    this.inventoryList = [
      ...this.inventoryList.slice(0, index),
      ...this.inventoryList.slice(index + 1),
    ];
  }

  onClickEdit(index: number, e: FetchInventoryDataList) {
    const dialogRef = this.dialog.open(InventoryManagementEditCrudComponent, {
      width: '30%',
      maxHeight: '96vh',
      disableClose: true,
      data: e,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const editSuccessMessage = 'Product edited successfully';
        this.snackBar.open(editSuccessMessage, 'Close', {
          duration: 5000,
        });
        this.removeElementFromInventory(index);
        this.inventoryList.splice(index, 0, result);
      }
      this.calculateTotals();
    });
  }

  onClickView(index: number, e: FetchInventoryDataList) {
    this.visibility_toggle = !this.visibility_toggle;
    this.disabledRowIndex = index;
    e.disableRow = !e.disableRow;
    this.inventoryList[index] = { ...e };
  }
}
