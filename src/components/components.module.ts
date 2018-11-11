import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SelectModalComponent } from './select-modal/select-modal';
@NgModule({
	declarations: [SelectModalComponent],
	imports: [IonicModule.forRoot(SelectModalComponent)],
	exports: [SelectModalComponent]
})
export class ComponentsModule {}
