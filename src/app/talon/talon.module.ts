import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TalonRoutingModule } from './talon-routing.module';
import { TalonPageComponent } from './pages/talon-page/talon-page.component';
import { TalonSchedulerComponent } from './components/talon-scheduler/talon-scheduler.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TalonRoutingModule
  ],
  declarations: [TalonPageComponent, TalonSchedulerComponent],
  exports: [TalonPageComponent]
})
export class TalonModule { }
