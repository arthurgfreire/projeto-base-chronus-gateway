import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRaca } from 'app/shared/model/projetoBaseChronus/raca.model';
import { RacaService } from './raca.service';

@Component({
  templateUrl: './raca-delete-dialog.component.html',
})
export class RacaDeleteDialogComponent {
  raca?: IRaca;

  constructor(protected racaService: RacaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.racaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('racaListModification');
      this.activeModal.close();
    });
  }
}
