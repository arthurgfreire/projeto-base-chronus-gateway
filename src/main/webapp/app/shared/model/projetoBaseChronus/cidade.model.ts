export interface ICidade {
  id?: string;
  descricao?: string;
  ufId?: string;
}

export class Cidade implements ICidade {
  constructor(public id?: string, public descricao?: string, public ufId?: string) {}
}
