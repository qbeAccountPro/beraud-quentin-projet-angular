import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplexFormRoutingModule } from './complex-form-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ComplexFormService } from './services/complex-form.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComplexFormRoutingModule,
    SharedModule
  ], providers: [
    ComplexFormService
  ]
})
export class ComplexFormModule { }
