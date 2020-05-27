export interface ITipUsuPessoaEntid {
  id?: string;
  pessoaId?: string;
  entidadeId?: string;
  tipoUsuarioId?: string;
}

export class TipUsuPessoaEntid implements ITipUsuPessoaEntid {
  constructor(public id?: string, public pessoaId?: string, public entidadeId?: string, public tipoUsuarioId?: string) {}
}
