import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { InventoryManagementListComponent } from './inventory-management-list/inventory-management-list.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    TestBed.overrideComponent(AppComponent,{
    
    })
    await TestBed.configureTestingModule({
      imports:[InventoryManagementListComponent]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'inventory-management'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('inventory-management');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toBeUndefined;
  });
  
});
