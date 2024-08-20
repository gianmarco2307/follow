import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisservizioComponent } from './disservizio.component';

describe('DisservizioComponent', () => {
  let component: DisservizioComponent;
  let fixture: ComponentFixture<DisservizioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisservizioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisservizioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
