import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { InventoryManagementListComponent } from './inventory-management-list.component';
import { FetchInventoryDataList } from '../models/fetch-inventory-data.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

describe('InventoryManagementListComponent', () => {
  let component: InventoryManagementListComponent;
  let fixture: ComponentFixture<InventoryManagementListComponent>;
  let snackBar: MatSnackBar;
  let dialog: MatDialog;
  let httpClientSpy: jasmine.Spy;

  beforeEach(async () => {
    TestBed.overrideComponent(InventoryManagementListComponent,{})
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSlideToggleModule,
        MatInputModule,
        MatIconModule,
        MatTableModule,      
          MatDialogModule,
        FormsModule,
        CommonModule
      ],
      providers: [MatSnackBar, MatDialog,  MatButtonModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryManagementListComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    dialog = TestBed.inject(MatDialog);
    httpClientSpy = spyOn(TestBed.inject(HttpClient), 'get');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 

  it('should remove element from inventory list', () => {
    const testData: FetchInventoryDataList[] = [{ }];

    component.inventoryList = testData;
    const initialLength = component.inventoryList.length;
    component.removeElementFromInventory(0);

    expect(component.inventoryList.length).toBe(initialLength - 1);
  });

  it('should calculate totals correctly when price or quantity is undefined', () => {
    // Arrange
    const testData: FetchInventoryDataList[] = [
      { price: '$10', quantity: 5, category: 'Electronics' },
      { price: undefined, quantity: 0, category: 'Electronics' },
      { price: '$15', quantity: undefined, category: 'Books' },
      { price: undefined, quantity: undefined, category: 'Clothing' }
    ];
    component.inventoryList = testData;
  
    // Act
    component.calculateTotals();
  
    // Assert
    expect(component.totalProduct).toBe(4);
    expect(component.totalStoreValue).toBe(50);
    expect(component.outOfStock).toBe(1);
    expect(component.numberOfCategory).toBe(3); 
  });
  
  
});
