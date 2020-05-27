import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetoBaseChronusGatewaySharedModule } from 'app/shared/shared.module';
import { ClassificacaoUsuarioComponent } from './classificacao-usuario.component';
import { ClassificacaoUsuarioDetailComponent } from './classificacao-usuario-detail.component';
import { ClassificacaoUsuarioUpdateComponent } from './classificacao-usuario-update.component';
import { ClassificacaoUsuarioDeleteDialogComponent } from './classificacao-usuario-delete-dialog.component';
import { classificacaoUsuarioRoute } from './classificacao-usuario.route';

@NgModule({
  imports: [ProjetoBaseChronusGatewaySharedModule, RouterModule.forChild(classificacaoUsuarioRoute)],
  declarations: [
    ClassificacaoUsuarioComponent,
    ClassificacaoUsuarioDetailComponent,
    ClassificacaoUsuarioUpdateComponent,
    ClassificacaoUsuarioDeleteDialogComponent,
  ],
  entryComponents: [ClassificacaoUsuarioDeleteDialogComponent],
})
export class ProjetoBaseChronusClassificacaoUsuarioModule {}
