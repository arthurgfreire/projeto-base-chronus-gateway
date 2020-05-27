import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetoBaseChronusGatewaySharedModule } from 'app/shared/shared.module';
import { EntidadeComponent } from './entidade.component';
import { EntidadeDetailComponent } from './entidade-detail.component';
import { EntidadeUpdateComponent } from './entidade-update.component';
import { EntidadeDeleteDialogComponent } from './entidade-delete-dialog.component';
import { entidadeRoute } from './entidade.route';

@NgModule({
  imports: [ProjetoBaseChronusGatewaySharedModule, RouterModule.forChild(entidadeRoute)],
  declarations: [EntidadeComponent, EntidadeDetailComponent, EntidadeUpdateComponent, EntidadeDeleteDialogComponent],
  entryComponents: [EntidadeDeleteDialogComponent],
})
export class ProjetoBaseChronusEntidadeModule {}
