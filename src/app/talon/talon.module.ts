import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalonRoutingModule } from './talon-routing.module';
import { TalonPageComponent } from './pages/talon-page/talon-page.component';

@NgModule({
  imports: [
    CommonModule,
    TalonRoutingModule
  ],
  declarations: [TalonPageComponent],
  exports: [TalonPageComponent]
})
export class TalonModule { }
