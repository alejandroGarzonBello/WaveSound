import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubidaComponent } from './subida.component';

describe('SubidaComponent', () => {
  let component: SubidaComponent;
  let fixture: ComponentFixture<SubidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
