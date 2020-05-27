import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IEntidade, Entidade } from 'app/shared/model/projetoBaseChronus/entidade.model';
import { EntidadeService } from './entidade.service';
import { IEndereco } from 'app/shared/model/projetoBaseChronus/endereco.model';
import { EnderecoService } from 'app/entities/projetoBaseChronus/endereco/endereco.service';

@Component({
  selector: 'jhi-entidade-update',
  templateUrl: './entidade-update.component.html',
})
export class EntidadeUpdateComponent implements OnInit {
  isSaving = false;
  enderecos: IEndereco[] = [];

  editForm = this.fb.group({
    id: [],
    tipoCadastro: [null, [Validators.required]],
    tipoUnidade: [null, [Validators.required]],
    razaoSocial: [null, [Validators.required]],
    nomeFantasia: [],
    cnpj: [],
    inscricaoEstadual: [],
    inscricaoMunicipal: [],
    telefone: [null, [Validators.required, Validators.pattern('(\\(?\\d{3}\\)?\\s)?(\\d{4,5}\\-\\d{4})')]],
    email: [null, []],
    tipoLicneca: [null, [Validators.required]],
    quantLicencas: [],
    enderecoId: [null, Validators.required],
  });

  constructor(
    protected entidadeService: EntidadeService,
    protected EnderecoService: EnderecoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entidade }) => {
      this.updateForm(entidade);

      this.EnderecoService.query({ filter: 'entidade-is-null' })
        .pipe(
          map((res: HttpResponse<IEndereco[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEndereco[]) => {
          if (!entidade.enderecoId) {
            this.enderecos = resBody;
          } else {
            this.EnderecoService.find(entidade.enderecoId)
              .pipe(
                map((subRes: HttpResponse<IEndereco>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEndereco[]) => (this.enderecos = concatRes));
          }
        });
    });
  }

  updateForm(entidade: IEntidade): void {
    this.editForm.patchValue({
      id: entidade.id,
      tipoCadastro: entidade.tipoCadastro,
      tipoUnidade: entidade.tipoUnidade,
      razaoSocial: entidade.razaoSocial,
      nomeFantasia: entidade.nomeFantasia,
      cnpj: entidade.cnpj,
      inscricaoEstadual: entidade.inscricaoEstadual,
      inscricaoMunicipal: entidade.inscricaoMunicipal,
      telefone: entidade.telefone,
      email: entidade.email,
      tipoLicneca: entidade.tipoLicneca,
      quantLicencas: entidade.quantLicencas,
      enderecoId: entidade.enderecoId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entidade = this.createFromForm();
    if (entidade.id !== undefined) {
      this.subscribeToSaveResponse(this.entidadeService.update(entidade));
    } else {
      this.subscribeToSaveResponse(this.entidadeService.create(entidade));
    }
  }

  private createFromForm(): IEntidade {
    return {
      ...new Entidade(),
      id: this.editForm.get(['id'])!.value,
      tipoCadastro: this.editForm.get(['tipoCadastro'])!.value,
      tipoUnidade: this.editForm.get(['tipoUnidade'])!.value,
      razaoSocial: this.editForm.get(['razaoSocial'])!.value,
      nomeFantasia: this.editForm.get(['nomeFantasia'])!.value,
      cnpj: this.editForm.get(['cnpj'])!.value,
      inscricaoEstadual: this.editForm.get(['inscricaoEstadual'])!.value,
      inscricaoMunicipal: this.editForm.get(['inscricaoMunicipal'])!.value,
      telefone: this.editForm.get(['telefone'])!.value,
      email: this.editForm.get(['email'])!.value,
      tipoLicneca: this.editForm.get(['tipoLicneca'])!.value,
      quantLicencas: this.editForm.get(['quantLicencas'])!.value,
      enderecoId: this.editForm.get(['enderecoId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntidade>>): void {
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

  trackById(index: number, item: IEndereco): any {
    return item.id;
  }
}
