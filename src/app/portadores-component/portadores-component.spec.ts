import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortadoresComponent } from './portadores-component';

describe('PortadoresComponent', () => {
  let component: PortadoresComponent;
  let fixture: ComponentFixture<PortadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortadoresComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
