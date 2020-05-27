export interface IUf {
  id?: string;
  descricao?: string;
  paisId?: string;
}

export class Uf implements IUf {
  constructor(public id?: string, public descricao?: string, public paisId?: string) {}
}
