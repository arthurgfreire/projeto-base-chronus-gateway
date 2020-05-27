import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUnidadeAtendimento, UnidadeAtendimento } from 'app/shared/model/projetoBaseChronus/unidade-atendimento.model';
import { UnidadeAtendimentoService } from './unidade-atendimento.service';
import { IEndereco } from 'app/shared/model/projetoBaseChronus/endereco.model';
import { EnderecoService } from 'app/entities/projetoBaseChronus/endereco/endereco.service';
import { IEntidade } from 'app/shared/model/projetoBaseChronus/entidade.model';
import { EntidadeService } from 'app/entities/projetoBaseChronus/entidade/entidade.service';

type SelectableEntity = IEndereco | IEntidade;

@Component({
  selector: 'jhi-unidade-atendimento-update',
  templateUrl: './unidade-atendimento-update.component.html',
})
export class UnidadeAtendimentoUpdateComponent implements OnInit {
  isSaving = false;
  enderecos: IEndereco[] = [];
  entidades: IEntidade[] = [];

  editForm = this.fb.group({
    id: [],
    razaoSocial: [null, [Validators.required]],
    nomeFantasia: [],
    enderecoId: [null, Validators.required],
    entidadeId: [null, Validators.required],
  });

  constructor(
    protected unidadeAtendimentoService: UnidadeAtendimentoService,
    protected EnderecoService: EnderecoService,
    protected EntidadeService: EntidadeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ unidadeAtendimento }) => {
      this.updateForm(unidadeAtendimento);

      this.EnderecoService.query({ filter: 'unidadeatendimento-is-null' })
        .pipe(
          map((res: HttpResponse<IEndereco[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEndereco[]) => {
          if (!unidadeAtendimento.enderecoId) {
            this.enderecos = resBody;
          } else {
            this.EnderecoService.find(unidadeAtendimento.enderecoId)
              .pipe(
                map((subRes: HttpResponse<IEndereco>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEndereco[]) => (this.enderecos = concatRes));
          }
        });

      this.EntidadeService.query().subscribe((res: HttpResponse<IEntidade[]>) => (this.entidades = res.body || []));
    });
  }

  updateForm(unidadeAtendimento: IUnidadeAtendimento): void {
    this.editForm.patchValue({
      id: unidadeAtendimento.id,
      razaoSocial: unidadeAtendimento.razaoSocial,
      nomeFantasia: unidadeAtendimento.nomeFantasia,
      enderecoId: unidadeAtendimento.enderecoId,
      entidadeId: unidadeAtendimento.entidadeId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const unidadeAtendimento = this.createFromForm();
    if (unidadeAtendimento.id !== undefined) {
      this.subscribeToSaveResponse(this.unidadeAtendimentoService.update(unidadeAtendimento));
    } else {
      this.subscribeToSaveResponse(this.unidadeAtendimentoService.create(unidadeAtendimento));
    }
  }

  private createFromForm(): IUnidadeAtendimento {
    return {
      ...new UnidadeAtendimento(),
      id: this.editForm.get(['id'])!.value,
      razaoSocial: this.editForm.get(['razaoSocial'])!.value,
      nomeFantasia: this.editForm.get(['nomeFantasia'])!.value,
      enderecoId: this.editForm.get(['enderecoId'])!.value,
      entidadeId: this.editForm.get(['entidadeId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUnidadeAtendimento>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
