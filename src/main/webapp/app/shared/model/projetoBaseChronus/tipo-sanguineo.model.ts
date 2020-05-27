export interface ITipoSanguineo {
  id?: string;
  descricao?: string;
}

export class TipoSanguineo implements ITipoSanguineo {
  constructor(public id?: string, public descricao?: string) {}
}
