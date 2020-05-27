export interface IUnidadeAtendimento {
  id?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  enderecoId?: string;
  entidadeId?: string;
}

export class UnidadeAtendimento implements IUnidadeAtendimento {
  constructor(
    public id?: string,
    public razaoSocial?: string,
    public nomeFantasia?: string,
    public enderecoId?: string,
    public entidadeId?: string
  ) {}
}
