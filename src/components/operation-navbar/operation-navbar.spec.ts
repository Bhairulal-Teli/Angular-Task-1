import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationNavbar } from './operation-navbar';

describe('OperationNavbar', () => {
  let component: OperationNavbar;
  let fixture: ComponentFixture<OperationNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationNavbar],
    }).compileComponents();

    fixture = TestBed.createComponent(OperationNavbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
