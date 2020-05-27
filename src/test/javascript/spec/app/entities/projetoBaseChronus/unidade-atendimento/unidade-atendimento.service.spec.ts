import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UnidadeAtendimentoService } from 'app/entities/projetoBaseChronus/unidade-atendimento/unidade-atendimento.service';
import { IUnidadeAtendimento, UnidadeAtendimento } from 'app/shared/model/projetoBaseChronus/unidade-atendimento.model';

describe('Service Tests', () => {
  describe('UnidadeAtendimento Service', () => {
    let injector: TestBed;
    let service: UnidadeAtendimentoService;
    let httpMock: HttpTestingController;
    let elemDefault: IUnidadeAtendimento;
    let expectedResult: IUnidadeAtendimento | IUnidadeAtendimento[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(UnidadeAtendimentoService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new UnidadeAtendimento('ID', 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find('123').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a UnidadeAtendimento', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new UnidadeAtendimento()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a UnidadeAtendimento', () => {
        const returnedFromService = Object.assign(
          {
            razaoSocial: 'BBBBBB',
            nomeFantasia: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of UnidadeAtendimento', () => {
        const returnedFromService = Object.assign(
          {
            razaoSocial: 'BBBBBB',
            nomeFantasia: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a UnidadeAtendimento', () => {
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
