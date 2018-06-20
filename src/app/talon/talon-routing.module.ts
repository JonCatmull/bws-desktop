import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TalonPageComponent } from './pages/talon-page/talon-page.component';

const routes: Routes = [
  {
    path: '',
    component: TalonPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TalonRoutingModule { }
