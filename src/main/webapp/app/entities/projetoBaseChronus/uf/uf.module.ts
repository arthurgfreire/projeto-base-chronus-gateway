import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetoBaseChronusGatewaySharedModule } from 'app/shared/shared.module';
import { UfComponent } from './uf.component';
import { UfDetailComponent } from './uf-detail.component';
import { UfUpdateComponent } from './uf-update.component';
import { UfDeleteDialogComponent } from './uf-delete-dialog.component';
import { ufRoute } from './uf.route';

@NgModule({
  imports: [ProjetoBaseChronusGatewaySharedModule, RouterModule.forChild(ufRoute)],
  declarations: [UfComponent, UfDetailComponent, UfUpdateComponent, UfDeleteDialogComponent],
  entryComponents: [UfDeleteDialogComponent],
})
export class ProjetoBaseChronusUfModule {}
