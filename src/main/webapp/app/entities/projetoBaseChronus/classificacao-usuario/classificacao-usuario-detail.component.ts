import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClassificacaoUsuario } from 'app/shared/model/projetoBaseChronus/classificacao-usuario.model';

@Component({
  selector: 'jhi-classificacao-usuario-detail',
  templateUrl: './classificacao-usuario-detail.component.html',
})
export class ClassificacaoUsuarioDetailComponent implements OnInit {
  classificacaoUsuario: IClassificacaoUsuario | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ classificacaoUsuario }) => (this.classificacaoUsuario = classificacaoUsuario));
  }

  previousState(): void {
    window.history.back();
  }
}
