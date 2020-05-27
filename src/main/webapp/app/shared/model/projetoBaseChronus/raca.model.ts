export interface IRaca {
  id?: string;
  descricao?: string;
}

export class Raca implements IRaca {
  constructor(public id?: string, public descricao?: string) {}
}
