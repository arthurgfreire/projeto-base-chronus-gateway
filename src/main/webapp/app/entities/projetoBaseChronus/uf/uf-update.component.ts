import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUf, Uf } from 'app/shared/model/projetoBaseChronus/uf.model';
import { UfService } from './uf.service';
import { IPais } from 'app/shared/model/projetoBaseChronus/pais.model';
import { PaisService } from 'app/entities/projetoBaseChronus/pais/pais.service';

@Component({
  selector: 'jhi-uf-update',
  templateUrl: './uf-update.component.html',
})
export class UfUpdateComponent implements OnInit {
  isSaving = false;
  pais: IPais[] = [];

  editForm = this.fb.group({
    id: [],
    descricao: [],
    paisId: [null, Validators.required],
  });

  constructor(
    protected ufService: UfService,
    protected PaisService: PaisService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ uf }) => {
      this.updateForm(uf);

      this.PaisService.query().subscribe((res: HttpResponse<IPais[]>) => (this.pais = res.body || []));
    });
  }

  updateForm(uf: IUf): void {
    this.editForm.patchValue({
      id: uf.id,
      descricao: uf.descricao,
      paisId: uf.paisId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const uf = this.createFromForm();
    if (uf.id !== undefined) {
      this.subscribeToSaveResponse(this.ufService.update(uf));
    } else {
      this.subscribeToSaveResponse(this.ufService.create(uf));
    }
  }

  private createFromForm(): IUf {
    return {
      ...new Uf(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      paisId: this.editForm.get(['paisId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUf>>): void {
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

  trackById(index: number, item: IPais): any {
    return item.id;
  }
}
