import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITipUsuPessoaEntid, TipUsuPessoaEntid } from 'app/shared/model/projetoBaseChronus/tip-usu-pessoa-entid.model';
import { TipUsuPessoaEntidService } from './tip-usu-pessoa-entid.service';
import { IPessoa } from 'app/shared/model/projetoBaseChronus/pessoa.model';
import { PessoaService } from 'app/entities/projetoBaseChronus/pessoa/pessoa.service';
import { IEntidade } from 'app/shared/model/projetoBaseChronus/entidade.model';
import { EntidadeService } from 'app/entities/projetoBaseChronus/entidade/entidade.service';
import { ITipoUsuario } from 'app/shared/model/projetoBaseChronus/tipo-usuario.model';
import { TipoUsuarioService } from 'app/entities/projetoBaseChronus/tipo-usuario/tipo-usuario.service';

type SelectableEntity = IPessoa | IEntidade | ITipoUsuario;

@Component({
  selector: 'jhi-tip-usu-pessoa-entid-update',
  templateUrl: './tip-usu-pessoa-entid-update.component.html',
})
export class TipUsuPessoaEntidUpdateComponent implements OnInit {
  isSaving = false;
  pessoas: IPessoa[] = [];
  entidades: IEntidade[] = [];
  tipousuarios: ITipoUsuario[] = [];

  editForm = this.fb.group({
    id: [],
    pessoaId: [null, Validators.required],
    entidadeId: [null, Validators.required],
    tipoUsuarioId: [],
  });

  constructor(
    protected tipUsuPessoaEntidService: TipUsuPessoaEntidService,
    protected PessoaService: PessoaService,
    protected EntidadeService: EntidadeService,
    protected TipoUsuarioService: TipoUsuarioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipUsuPessoaEntid }) => {
      this.updateForm(tipUsuPessoaEntid);

      this.PessoaService.query().subscribe((res: HttpResponse<IPessoa[]>) => (this.pessoas = res.body || []));

      this.EntidadeService.query().subscribe((res: HttpResponse<IEntidade[]>) => (this.entidades = res.body || []));

      this.TipoUsuarioService.query().subscribe((res: HttpResponse<ITipoUsuario[]>) => (this.tipousuarios = res.body || []));
    });
  }

  updateForm(tipUsuPessoaEntid: ITipUsuPessoaEntid): void {
    this.editForm.patchValue({
      id: tipUsuPessoaEntid.id,
      pessoaId: tipUsuPessoaEntid.pessoaId,
      entidadeId: tipUsuPessoaEntid.entidadeId,
      tipoUsuarioId: tipUsuPessoaEntid.tipoUsuarioId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipUsuPessoaEntid = this.createFromForm();
    if (tipUsuPessoaEntid.id !== undefined) {
      this.subscribeToSaveResponse(this.tipUsuPessoaEntidService.update(tipUsuPessoaEntid));
    } else {
      this.subscribeToSaveResponse(this.tipUsuPessoaEntidService.create(tipUsuPessoaEntid));
    }
  }

  private createFromForm(): ITipUsuPessoaEntid {
    return {
      ...new TipUsuPessoaEntid(),
      id: this.editForm.get(['id'])!.value,
      pessoaId: this.editForm.get(['pessoaId'])!.value,
      entidadeId: this.editForm.get(['entidadeId'])!.value,
      tipoUsuarioId: this.editForm.get(['tipoUsuarioId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipUsuPessoaEntid>>): void {
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
