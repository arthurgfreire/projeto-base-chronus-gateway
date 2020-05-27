import { Moment } from 'moment';
import { Genero } from 'app/shared/model/enumerations/genero.model';
import { EstadoCivil } from 'app/shared/model/enumerations/estado-civil.model';

export interface IPessoa {
  id?: string;
  fotoContentType?: string;
  foto?: any;
  nome?: string;
  cpf?: string;
  rg?: string;
  cnh?: string;
  passaporte?: string;
  certidaoNascimento?: string;
  estrangeiro?: boolean;
  MoraOutrasPessoas?: boolean;
  telefone?: string;
  email?: string;
  temFilhos?: boolean;
  quantFilhos?: number;
  genero?: Genero;
  estadoCivil?: EstadoCivil;
  dataExpiracao?: Moment;
  enderecoId?: string;
  racaId?: string;
  tipoSanguineoId?: string;
  classificacaoUsuarioId?: string;
}

export class Pessoa implements IPessoa {
  constructor(
    public id?: string,
    public fotoContentType?: string,
    public foto?: any,
    public nome?: string,
    public cpf?: string,
    public rg?: string,
    public cnh?: string,
    public passaporte?: string,
    public certidaoNascimento?: string,
    public estrangeiro?: boolean,
    public MoraOutrasPessoas?: boolean,
    public telefone?: string,
    public email?: string,
    public temFilhos?: boolean,
    public quantFilhos?: number,
    public genero?: Genero,
    public estadoCivil?: EstadoCivil,
    public dataExpiracao?: Moment,
    public enderecoId?: string,
    public racaId?: string,
    public tipoSanguineoId?: string,
    public classificacaoUsuarioId?: string
  ) {
    this.estrangeiro = this.estrangeiro || false;
    this.MoraOutrasPessoas = this.MoraOutrasPessoas || false;
    this.temFilhos = this.temFilhos || false;
  }
}
