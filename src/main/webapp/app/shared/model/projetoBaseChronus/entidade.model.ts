import { IUnidadeAtendimento } from 'app/shared/model/projetoBaseChronus/unidade-atendimento.model';
import { TipoCadastro } from 'app/shared/model/enumerations/tipo-cadastro.model';
import { TipoUnidade } from 'app/shared/model/enumerations/tipo-unidade.model';
import { TipoLicneca } from 'app/shared/model/enumerations/tipo-licneca.model';

export interface IEntidade {
  id?: string;
  tipoCadastro?: TipoCadastro;
  tipoUnidade?: TipoUnidade;
  razaoSocial?: string;
  nomeFantasia?: string;
  cnpj?: string;
  inscricaoEstadual?: string;
  inscricaoMunicipal?: string;
  telefone?: string;
  email?: string;
  tipoLicneca?: TipoLicneca;
  quantLicencas?: number;
  enderecoId?: string;
  unidadeAtendimentos?: IUnidadeAtendimento[];
}

export class Entidade implements IEntidade {
  constructor(
    public id?: string,
    public tipoCadastro?: TipoCadastro,
    public tipoUnidade?: TipoUnidade,
    public razaoSocial?: string,
    public nomeFantasia?: string,
    public cnpj?: string,
    public inscricaoEstadual?: string,
    public inscricaoMunicipal?: string,
    public telefone?: string,
    public email?: string,
    public tipoLicneca?: TipoLicneca,
    public quantLicencas?: number,
    public enderecoId?: string,
    public unidadeAtendimentos?: IUnidadeAtendimento[]
  ) {}
}
