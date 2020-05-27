import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUf } from 'app/shared/model/projetoBaseChronus/uf.model';

@Component({
  selector: 'jhi-uf-detail',
  templateUrl: './uf-detail.component.html',
})
export class UfDetailComponent implements OnInit {
  uf: IUf | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ uf }) => (this.uf = uf));
  }

  previousState(): void {
    window.history.back();
  }
}
