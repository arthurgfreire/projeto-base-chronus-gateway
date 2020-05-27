import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUf } from 'app/shared/model/projetoBaseChronus/uf.model';
import { UfService } from './uf.service';

@Component({
  templateUrl: './uf-delete-dialog.component.html',
})
export class UfDeleteDialogComponent {
  uf?: IUf;

  constructor(protected ufService: UfService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.ufService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ufListModification');
      this.activeModal.close();
    });
  }
}
