import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUnidadeAtendimento } from 'app/shared/model/projetoBaseChronus/unidade-atendimento.model';
import { UnidadeAtendimentoService } from './unidade-atendimento.service';

@Component({
  templateUrl: './unidade-atendimento-delete-dialog.component.html',
})
export class UnidadeAtendimentoDeleteDialogComponent {
  unidadeAtendimento?: IUnidadeAtendimento;

  constructor(
    protected unidadeAtendimentoService: UnidadeAtendimentoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.unidadeAtendimentoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('unidadeAtendimentoListModification');
      this.activeModal.close();
    });
  }
}
