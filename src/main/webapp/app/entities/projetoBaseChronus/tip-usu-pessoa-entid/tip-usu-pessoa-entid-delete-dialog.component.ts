import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipUsuPessoaEntid } from 'app/shared/model/projetoBaseChronus/tip-usu-pessoa-entid.model';
import { TipUsuPessoaEntidService } from './tip-usu-pessoa-entid.service';

@Component({
  templateUrl: './tip-usu-pessoa-entid-delete-dialog.component.html',
})
export class TipUsuPessoaEntidDeleteDialogComponent {
  tipUsuPessoaEntid?: ITipUsuPessoaEntid;

  constructor(
    protected tipUsuPessoaEntidService: TipUsuPessoaEntidService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.tipUsuPessoaEntidService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tipUsuPessoaEntidListModification');
      this.activeModal.close();
    });
  }
}
