export interface IEndereco {
  id?: string;
  bairro?: string;
  rua?: string;
  numero?: string;
  cep?: string;
  paisId?: string;
  ufId?: string;
  cidadeId?: string;
}

export class Endereco implements IEndereco {
  constructor(
    public id?: string,
    public bairro?: string,
    public rua?: string,
    public numero?: string,
    public cep?: string,
    public paisId?: string,
    public ufId?: string,
    public cidadeId?: string
  ) {}
}
