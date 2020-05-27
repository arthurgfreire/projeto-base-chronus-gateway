import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetoBaseChronusGatewaySharedModule } from 'app/shared/shared.module';
import { UnidadeAtendimentoComponent } from './unidade-atendimento.component';
import { UnidadeAtendimentoDetailComponent } from './unidade-atendimento-detail.component';
import { UnidadeAtendimentoUpdateComponent } from './unidade-atendimento-update.component';
import { UnidadeAtendimentoDeleteDialogComponent } from './unidade-atendimento-delete-dialog.component';
import { unidadeAtendimentoRoute } from './unidade-atendimento.route';

@NgModule({
  imports: [ProjetoBaseChronusGatewaySharedModule, RouterModule.forChild(unidadeAtendimentoRoute)],
  declarations: [
    UnidadeAtendimentoComponent,
    UnidadeAtendimentoDetailComponent,
    UnidadeAtendimentoUpdateComponent,
    UnidadeAtendimentoDeleteDialogComponent,
  ],
  entryComponents: [UnidadeAtendimentoDeleteDialogComponent],
})
export class ProjetoBaseChronusUnidadeAtendimentoModule {}
