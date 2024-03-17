import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Container3Component } from './container3.component';

describe('Container3Component', () => {
  let component: Container3Component;
  let fixture: ComponentFixture<Container3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Container3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Container3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
