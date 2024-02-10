import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryManagementEditCrudComponent } from './inventory-management-edit-crud.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('InventoryManagementEditCrudComponent', () => {
  let component: InventoryManagementEditCrudComponent;
  let fixture: ComponentFixture<InventoryManagementEditCrudComponent>;
  const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed']);
  beforeEach(async () => {
    const dialogDataStub = {
      name:'test',
      category:'test',
      value:'test',
      quantity:1,
      price:'test'
    }
    TestBed.overrideComponent(InventoryManagementEditCrudComponent, {

    })
    await TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpyObj },
        { provide: MAT_DIALOG_DATA, useValue: dialogDataStub },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryManagementEditCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should construct the result object correctly when all data is provided', () => {
    // Arrange
    component.product_data = { name:'Product A',  category: 'Category A', quantity:5, value: 'Value A', price: '$10' };
    component.category_name = 'New Category';
    component.value = 'New Value';
    component.quantity = 5;
    component.product_price = '$20';

    // Act
    component.onClickSave();

    // Assert
    expect(dialogRefSpyObj.close).toHaveBeenCalledWith({
      name: 'Product A',
      category: 'New Category',
      value: 'New Value',
      quantity: 5,
      price: '$20'
    });
  });
});
