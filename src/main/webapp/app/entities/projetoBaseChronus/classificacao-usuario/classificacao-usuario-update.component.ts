import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IClassificacaoUsuario, ClassificacaoUsuario } from 'app/shared/model/projetoBaseChronus/classificacao-usuario.model';
import { ClassificacaoUsuarioService } from './classificacao-usuario.service';

@Component({
  selector: 'jhi-classificacao-usuario-update',
  templateUrl: './classificacao-usuario-update.component.html',
})
export class ClassificacaoUsuarioUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    descricao: [],
    cor: [],
  });

  constructor(
    protected classificacaoUsuarioService: ClassificacaoUsuarioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ classificacaoUsuario }) => {
      this.updateForm(classificacaoUsuario);
    });
  }

  updateForm(classificacaoUsuario: IClassificacaoUsuario): void {
    this.editForm.patchValue({
      id: classificacaoUsuario.id,
      descricao: classificacaoUsuario.descricao,
      cor: classificacaoUsuario.cor,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const classificacaoUsuario = this.createFromForm();
    if (classificacaoUsuario.id !== undefined) {
      this.subscribeToSaveResponse(this.classificacaoUsuarioService.update(classificacaoUsuario));
    } else {
      this.subscribeToSaveResponse(this.classificacaoUsuarioService.create(classificacaoUsuario));
    }
  }

  private createFromForm(): IClassificacaoUsuario {
    return {
      ...new ClassificacaoUsuario(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      cor: this.editForm.get(['cor'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClassificacaoUsuario>>): void {
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
