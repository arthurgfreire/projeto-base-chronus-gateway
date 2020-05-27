export interface IPais {
  id?: string;
  descricao?: string;
}

export class Pais implements IPais {
  constructor(public id?: string, public descricao?: string) {}
}
