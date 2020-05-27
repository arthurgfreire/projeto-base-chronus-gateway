import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEndereco, Endereco } from 'app/shared/model/projetoBaseChronus/endereco.model';
import { EnderecoService } from './endereco.service';
import { IPais } from 'app/shared/model/projetoBaseChronus/pais.model';
import { PaisService } from 'app/entities/projetoBaseChronus/pais/pais.service';
import { IUf } from 'app/shared/model/projetoBaseChronus/uf.model';
import { UfService } from 'app/entities/projetoBaseChronus/uf/uf.service';
import { ICidade } from 'app/shared/model/projetoBaseChronus/cidade.model';
import { CidadeService } from 'app/entities/projetoBaseChronus/cidade/cidade.service';

type SelectableEntity = IPais | IUf | ICidade;

@Component({
  selector: 'jhi-endereco-update',
  templateUrl: './endereco-update.component.html',
})
export class EnderecoUpdateComponent implements OnInit {
  isSaving = false;
  pais: IPais[] = [];
  ufs: IUf[] = [];
  cidades: ICidade[] = [];

  editForm = this.fb.group({
    id: [],
    bairro: [null, [Validators.required]],
    rua: [],
    numero: [],
    cep: [],
    paisId: [null, Validators.required],
    ufId: [null, Validators.required],
    cidadeId: [null, Validators.required],
  });

  constructor(
    protected enderecoService: EnderecoService,
    protected PaisService: PaisService,
    protected UfService: UfService,
    protected CidadeService: CidadeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ endereco }) => {
      this.updateForm(endereco);

      this.PaisService.query().subscribe((res: HttpResponse<IPais[]>) => (this.pais = res.body || []));

      this.UfService.query().subscribe((res: HttpResponse<IUf[]>) => (this.ufs = res.body || []));

      this.CidadeService.query().subscribe((res: HttpResponse<ICidade[]>) => (this.cidades = res.body || []));
    });
  }

  updateForm(endereco: IEndereco): void {
    this.editForm.patchValue({
      id: endereco.id,
      bairro: endereco.bairro,
      rua: endereco.rua,
      numero: endereco.numero,
      cep: endereco.cep,
      paisId: endereco.paisId,
      ufId: endereco.ufId,
      cidadeId: endereco.cidadeId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const endereco = this.createFromForm();
    if (endereco.id !== undefined) {
      this.subscribeToSaveResponse(this.enderecoService.update(endereco));
    } else {
      this.subscribeToSaveResponse(this.enderecoService.create(endereco));
    }
  }

  private createFromForm(): IEndereco {
    return {
      ...new Endereco(),
      id: this.editForm.get(['id'])!.value,
      bairro: this.editForm.get(['bairro'])!.value,
      rua: this.editForm.get(['rua'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      cep: this.editForm.get(['cep'])!.value,
      paisId: this.editForm.get(['paisId'])!.value,
      ufId: this.editForm.get(['ufId'])!.value,
      cidadeId: this.editForm.get(['cidadeId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEndereco>>): void {
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
