import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryMemu } from './product-category-memu';

describe('ProductCategoryMemu', () => {
  let component: ProductCategoryMemu;
  let fixture: ComponentFixture<ProductCategoryMemu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCategoryMemu],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCategoryMemu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
