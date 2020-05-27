import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IPessoa, Pessoa } from 'app/shared/model/projetoBaseChronus/pessoa.model';
import { PessoaService } from './pessoa.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IEndereco } from 'app/shared/model/projetoBaseChronus/endereco.model';
import { EnderecoService } from 'app/entities/projetoBaseChronus/endereco/endereco.service';
import { IRaca } from 'app/shared/model/projetoBaseChronus/raca.model';
import { RacaService } from 'app/entities/projetoBaseChronus/raca/raca.service';
import { ITipoSanguineo } from 'app/shared/model/projetoBaseChronus/tipo-sanguineo.model';
import { TipoSanguineoService } from 'app/entities/projetoBaseChronus/tipo-sanguineo/tipo-sanguineo.service';
import { IClassificacaoUsuario } from 'app/shared/model/projetoBaseChronus/classificacao-usuario.model';
import { ClassificacaoUsuarioService } from 'app/entities/projetoBaseChronus/classificacao-usuario/classificacao-usuario.service';

type SelectableEntity = IEndereco | IRaca | ITipoSanguineo | IClassificacaoUsuario;

@Component({
  selector: 'jhi-pessoa-update',
  templateUrl: './pessoa-update.component.html',
})
export class PessoaUpdateComponent implements OnInit {
  isSaving = false;
  enderecos: IEndereco[] = [];
  racas: IRaca[] = [];
  tiposanguineos: ITipoSanguineo[] = [];
  classificacaousuarios: IClassificacaoUsuario[] = [];
  dataExpiracaoDp: any;

  editForm = this.fb.group({
    id: [],
    foto: [],
    fotoContentType: [],
    nome: [null, [Validators.required]],
    cpf: [],
    rg: [],
    cnh: [],
    passaporte: [],
    certidaoNascimento: [],
    estrangeiro: [null, [Validators.required]],
    MoraOutrasPessoas: [null, [Validators.required]],
    telefone: [null, [Validators.required, Validators.pattern('(\\(?\\d{3}\\)?\\s)?(\\d{4,5}\\-\\d{4})')]],
    email: [null, []],
    temFilhos: [],
    quantFilhos: [],
    genero: [null, [Validators.required]],
    estadoCivil: [null, [Validators.required]],
    dataExpiracao: [],
    enderecoId: [null, Validators.required],
    racaId: [null, Validators.required],
    tipoSanguineoId: [],
    classificacaoUsuarioId: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected pessoaService: PessoaService,
    protected EnderecoService: EnderecoService,
    protected RacaService: RacaService,
    protected TipoSanguineoService: TipoSanguineoService,
    protected ClassificacaoUsuarioService: ClassificacaoUsuarioService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pessoa }) => {
      this.updateForm(pessoa);

      this.EnderecoService.query({ filter: 'pessoa-is-null' })
        .pipe(
          map((res: HttpResponse<IEndereco[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEndereco[]) => {
          if (!pessoa.enderecoId) {
            this.enderecos = resBody;
          } else {
            this.EnderecoService.find(pessoa.enderecoId)
              .pipe(
                map((subRes: HttpResponse<IEndereco>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEndereco[]) => (this.enderecos = concatRes));
          }
        });

      this.RacaService.query().subscribe((res: HttpResponse<IRaca[]>) => (this.racas = res.body || []));

      this.TipoSanguineoService.query().subscribe((res: HttpResponse<ITipoSanguineo[]>) => (this.tiposanguineos = res.body || []));

      this.ClassificacaoUsuarioService.query().subscribe(
        (res: HttpResponse<IClassificacaoUsuario[]>) => (this.classificacaousuarios = res.body || [])
      );
    });
  }

  updateForm(pessoa: IPessoa): void {
    this.editForm.patchValue({
      id: pessoa.id,
      foto: pessoa.foto,
      fotoContentType: pessoa.fotoContentType,
      nome: pessoa.nome,
      cpf: pessoa.cpf,
      rg: pessoa.rg,
      cnh: pessoa.cnh,
      passaporte: pessoa.passaporte,
      certidaoNascimento: pessoa.certidaoNascimento,
      estrangeiro: pessoa.estrangeiro,
      MoraOutrasPessoas: pessoa.MoraOutrasPessoas,
      telefone: pessoa.telefone,
      email: pessoa.email,
      temFilhos: pessoa.temFilhos,
      quantFilhos: pessoa.quantFilhos,
      genero: pessoa.genero,
      estadoCivil: pessoa.estadoCivil,
      dataExpiracao: pessoa.dataExpiracao,
      enderecoId: pessoa.enderecoId,
      racaId: pessoa.racaId,
      tipoSanguineoId: pessoa.tipoSanguineoId,
      classificacaoUsuarioId: pessoa.classificacaoUsuarioId,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('projetoBaseChronusGatewayApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pessoa = this.createFromForm();
    if (pessoa.id !== undefined) {
      this.subscribeToSaveResponse(this.pessoaService.update(pessoa));
    } else {
      this.subscribeToSaveResponse(this.pessoaService.create(pessoa));
    }
  }

  private createFromForm(): IPessoa {
    return {
      ...new Pessoa(),
      id: this.editForm.get(['id'])!.value,
      fotoContentType: this.editForm.get(['fotoContentType'])!.value,
      foto: this.editForm.get(['foto'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      cpf: this.editForm.get(['cpf'])!.value,
      rg: this.editForm.get(['rg'])!.value,
      cnh: this.editForm.get(['cnh'])!.value,
      passaporte: this.editForm.get(['passaporte'])!.value,
      certidaoNascimento: this.editForm.get(['certidaoNascimento'])!.value,
      estrangeiro: this.editForm.get(['estrangeiro'])!.value,
      MoraOutrasPessoas: this.editForm.get(['MoraOutrasPessoas'])!.value,
      telefone: this.editForm.get(['telefone'])!.value,
      email: this.editForm.get(['email'])!.value,
      temFilhos: this.editForm.get(['temFilhos'])!.value,
      quantFilhos: this.editForm.get(['quantFilhos'])!.value,
      genero: this.editForm.get(['genero'])!.value,
      estadoCivil: this.editForm.get(['estadoCivil'])!.value,
      dataExpiracao: this.editForm.get(['dataExpiracao'])!.value,
      enderecoId: this.editForm.get(['enderecoId'])!.value,
      racaId: this.editForm.get(['racaId'])!.value,
      tipoSanguineoId: this.editForm.get(['tipoSanguineoId'])!.value,
      classificacaoUsuarioId: this.editForm.get(['classificacaoUsuarioId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPessoa>>): void {
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
