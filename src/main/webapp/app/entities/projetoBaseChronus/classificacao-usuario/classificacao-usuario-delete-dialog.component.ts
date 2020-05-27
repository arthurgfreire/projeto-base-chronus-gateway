import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClassificacaoUsuario } from 'app/shared/model/projetoBaseChronus/classificacao-usuario.model';
import { ClassificacaoUsuarioService } from './classificacao-usuario.service';

@Component({
  templateUrl: './classificacao-usuario-delete-dialog.component.html',
})
export class ClassificacaoUsuarioDeleteDialogComponent {
  classificacaoUsuario?: IClassificacaoUsuario;

  constructor(
    protected classificacaoUsuarioService: ClassificacaoUsuarioService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.classificacaoUsuarioService.delete(id).subscribe(() => {
      this.eventManager.broadcast('classificacaoUsuarioListModification');
      this.activeModal.close();
    });
  }
}
