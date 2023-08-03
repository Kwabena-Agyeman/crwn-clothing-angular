import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [],
  imports: [BsDropdownModule.forRoot(), CollapseModule.forRoot()],
  exports: [BsDropdownModule, CollapseModule],
})
export class BootstrapModule {}
