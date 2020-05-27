import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUnidadeAtendimento } from 'app/shared/model/projetoBaseChronus/unidade-atendimento.model';

@Component({
  selector: 'jhi-unidade-atendimento-detail',
  templateUrl: './unidade-atendimento-detail.component.html',
})
export class UnidadeAtendimentoDetailComponent implements OnInit {
  unidadeAtendimento: IUnidadeAtendimento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ unidadeAtendimento }) => (this.unidadeAtendimento = unidadeAtendimento));
  }

  previousState(): void {
    window.history.back();
  }
}
