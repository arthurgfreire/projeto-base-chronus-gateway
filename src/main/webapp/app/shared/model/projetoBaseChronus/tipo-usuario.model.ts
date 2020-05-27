export interface ITipoUsuario {
  id?: string;
  descricao?: string;
}

export class TipoUsuario implements ITipoUsuario {
  constructor(public id?: string, public descricao?: string) {}
}
