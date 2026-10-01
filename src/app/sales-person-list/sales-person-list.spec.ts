import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPersonList } from './sales-person-list';

describe('SalesPersonList', () => {
  let component: SalesPersonList;
  let fixture: ComponentFixture<SalesPersonList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesPersonList],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesPersonList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
