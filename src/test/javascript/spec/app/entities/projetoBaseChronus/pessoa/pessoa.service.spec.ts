import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { PessoaService } from 'app/entities/projetoBaseChronus/pessoa/pessoa.service';
import { IPessoa, Pessoa } from 'app/shared/model/projetoBaseChronus/pessoa.model';
import { Genero } from 'app/shared/model/enumerations/genero.model';
import { EstadoCivil } from 'app/shared/model/enumerations/estado-civil.model';

describe('Service Tests', () => {
  describe('Pessoa Service', () => {
    let injector: TestBed;
    let service: PessoaService;
    let httpMock: HttpTestingController;
    let elemDefault: IPessoa;
    let expectedResult: IPessoa | IPessoa[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PessoaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Pessoa(
        'ID',
        'image/png',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        false,
        false,
        'AAAAAAA',
        'AAAAAAA',
        false,
        0,
        Genero.HOMEM,
        EstadoCivil.CASADO,
        currentDate
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dataExpiracao: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find('123').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Pessoa', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
            dataExpiracao: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataExpiracao: currentDate,
          },
          returnedFromService
        );

        service.create(new Pessoa()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Pessoa', () => {
        const returnedFromService = Object.assign(
          {
            foto: 'BBBBBB',
            nome: 'BBBBBB',
            cpf: 'BBBBBB',
            rg: 'BBBBBB',
            cnh: 'BBBBBB',
            passaporte: 'BBBBBB',
            certidaoNascimento: 'BBBBBB',
            estrangeiro: true,
            MoraOutrasPessoas: true,
            telefone: 'BBBBBB',
            email: 'BBBBBB',
            temFilhos: true,
            quantFilhos: 1,
            genero: 'BBBBBB',
            estadoCivil: 'BBBBBB',
            dataExpiracao: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataExpiracao: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Pessoa', () => {
        const returnedFromService = Object.assign(
          {
            foto: 'BBBBBB',
            nome: 'BBBBBB',
            cpf: 'BBBBBB',
            rg: 'BBBBBB',
            cnh: 'BBBBBB',
            passaporte: 'BBBBBB',
            certidaoNascimento: 'BBBBBB',
            estrangeiro: true,
            MoraOutrasPessoas: true,
            telefone: 'BBBBBB',
            email: 'BBBBBB',
            temFilhos: true,
            quantFilhos: 1,
            genero: 'BBBBBB',
            estadoCivil: 'BBBBBB',
            dataExpiracao: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataExpiracao: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Pessoa', () => {
        service.delete('123').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
