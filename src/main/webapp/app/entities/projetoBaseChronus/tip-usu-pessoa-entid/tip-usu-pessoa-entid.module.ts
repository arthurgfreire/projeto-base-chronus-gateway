import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetoBaseChronusGatewaySharedModule } from 'app/shared/shared.module';
import { TipUsuPessoaEntidComponent } from './tip-usu-pessoa-entid.component';
import { TipUsuPessoaEntidDetailComponent } from './tip-usu-pessoa-entid-detail.component';
import { TipUsuPessoaEntidUpdateComponent } from './tip-usu-pessoa-entid-update.component';
import { TipUsuPessoaEntidDeleteDialogComponent } from './tip-usu-pessoa-entid-delete-dialog.component';
import { tipUsuPessoaEntidRoute } from './tip-usu-pessoa-entid.route';

@NgModule({
  imports: [ProjetoBaseChronusGatewaySharedModule, RouterModule.forChild(tipUsuPessoaEntidRoute)],
  declarations: [
    TipUsuPessoaEntidComponent,
    TipUsuPessoaEntidDetailComponent,
    TipUsuPessoaEntidUpdateComponent,
    TipUsuPessoaEntidDeleteDialogComponent,
  ],
  entryComponents: [TipUsuPessoaEntidDeleteDialogComponent],
})
export class ProjetoBaseChronusTipUsuPessoaEntidModule {}
