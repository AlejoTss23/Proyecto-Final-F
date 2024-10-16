import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdenTrabajoComponent } from './admin-orden-trabajo.component';

describe('AdminOrdenTrabajoComponent', () => {
  let component: AdminOrdenTrabajoComponent;
  let fixture: ComponentFixture<AdminOrdenTrabajoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrdenTrabajoComponent]
    });
    fixture = TestBed.createComponent(AdminOrdenTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
