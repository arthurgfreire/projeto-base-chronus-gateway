export interface IClassificacaoUsuario {
  id?: string;
  descricao?: string;
  cor?: string;
}

export class ClassificacaoUsuario implements IClassificacaoUsuario {
  constructor(public id?: string, public descricao?: string, public cor?: string) {}
}
