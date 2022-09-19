/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MiRutaAprendizComponent } from './mi-ruta-aprendiz.component';

describe('MiRutaAprendizComponent', () => {
  let component: MiRutaAprendizComponent;
  let fixture: ComponentFixture<MiRutaAprendizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiRutaAprendizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiRutaAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
