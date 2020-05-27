import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntidade } from 'app/shared/model/projetoBaseChronus/entidade.model';

@Component({
  selector: 'jhi-entidade-detail',
  templateUrl: './entidade-detail.component.html',
})
export class EntidadeDetailComponent implements OnInit {
  entidade: IEntidade | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entidade }) => (this.entidade = entidade));
  }

  previousState(): void {
    window.history.back();
  }
}
