import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICidade, Cidade } from 'app/shared/model/projetoBaseChronus/cidade.model';
import { CidadeService } from './cidade.service';
import { IUf } from 'app/shared/model/projetoBaseChronus/uf.model';
import { UfService } from 'app/entities/projetoBaseChronus/uf/uf.service';

@Component({
  selector: 'jhi-cidade-update',
  templateUrl: './cidade-update.component.html',
})
export class CidadeUpdateComponent implements OnInit {
  isSaving = false;
  ufs: IUf[] = [];

  editForm = this.fb.group({
    id: [],
    descricao: [],
    ufId: [null, Validators.required],
  });

  constructor(
    protected cidadeService: CidadeService,
    protected UfService: UfService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cidade }) => {
      this.updateForm(cidade);

      this.UfService.query().subscribe((res: HttpResponse<IUf[]>) => (this.ufs = res.body || []));
    });
  }

  updateForm(cidade: ICidade): void {
    this.editForm.patchValue({
      id: cidade.id,
      descricao: cidade.descricao,
      ufId: cidade.ufId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cidade = this.createFromForm();
    if (cidade.id !== undefined) {
      this.subscribeToSaveResponse(this.cidadeService.update(cidade));
    } else {
      this.subscribeToSaveResponse(this.cidadeService.create(cidade));
    }
  }

  private createFromForm(): ICidade {
    return {
      ...new Cidade(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      ufId: this.editForm.get(['ufId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICidade>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IUf): any {
    return item.id;
  }
}
