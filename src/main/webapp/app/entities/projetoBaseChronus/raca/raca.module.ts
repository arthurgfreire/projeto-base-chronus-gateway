import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetoBaseChronusGatewaySharedModule } from 'app/shared/shared.module';
import { RacaComponent } from './raca.component';
import { RacaDetailComponent } from './raca-detail.component';
import { RacaUpdateComponent } from './raca-update.component';
import { RacaDeleteDialogComponent } from './raca-delete-dialog.component';
import { racaRoute } from './raca.route';

@NgModule({
  imports: [ProjetoBaseChronusGatewaySharedModule, RouterModule.forChild(racaRoute)],
  declarations: [RacaComponent, RacaDetailComponent, RacaUpdateComponent, RacaDeleteDialogComponent],
  entryComponents: [RacaDeleteDialogComponent],
})
export class ProjetoBaseChronusRacaModule {}
