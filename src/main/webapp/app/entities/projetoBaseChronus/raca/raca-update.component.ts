import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRaca, Raca } from 'app/shared/model/projetoBaseChronus/raca.model';
import { RacaService } from './raca.service';

@Component({
  selector: 'jhi-raca-update',
  templateUrl: './raca-update.component.html',
})
export class RacaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    descricao: [],
  });

  constructor(protected racaService: RacaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ raca }) => {
      this.updateForm(raca);
    });
  }

  updateForm(raca: IRaca): void {
    this.editForm.patchValue({
      id: raca.id,
      descricao: raca.descricao,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const raca = this.createFromForm();
    if (raca.id !== undefined) {
      this.subscribeToSaveResponse(this.racaService.update(raca));
    } else {
      this.subscribeToSaveResponse(this.racaService.create(raca));
    }
  }

  private createFromForm(): IRaca {
    return {
      ...new Raca(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRaca>>): void {
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
}
