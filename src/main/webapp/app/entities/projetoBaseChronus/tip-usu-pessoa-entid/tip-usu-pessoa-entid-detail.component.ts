import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipUsuPessoaEntid } from 'app/shared/model/projetoBaseChronus/tip-usu-pessoa-entid.model';

@Component({
  selector: 'jhi-tip-usu-pessoa-entid-detail',
  templateUrl: './tip-usu-pessoa-entid-detail.component.html',
})
export class TipUsuPessoaEntidDetailComponent implements OnInit {
  tipUsuPessoaEntid: ITipUsuPessoaEntid | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipUsuPessoaEntid }) => (this.tipUsuPessoaEntid = tipUsuPessoaEntid));
  }

  previousState(): void {
    window.history.back();
  }
}
