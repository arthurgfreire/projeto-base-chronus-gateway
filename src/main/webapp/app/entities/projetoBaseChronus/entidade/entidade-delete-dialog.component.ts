import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEntidade } from 'app/shared/model/projetoBaseChronus/entidade.model';
import { EntidadeService } from './entidade.service';

@Component({
  templateUrl: './entidade-delete-dialog.component.html',
})
export class EntidadeDeleteDialogComponent {
  entidade?: IEntidade;

  constructor(protected entidadeService: EntidadeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.entidadeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('entidadeListModification');
      this.activeModal.close();
    });
  }
}
