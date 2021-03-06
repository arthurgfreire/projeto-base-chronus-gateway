import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap, Data } from '@angular/router';

import { ProjetoBaseChronusGatewayTestModule } from '../../../../test.module';
import { UnidadeAtendimentoComponent } from 'app/entities/projetoBaseChronus/unidade-atendimento/unidade-atendimento.component';
import { UnidadeAtendimentoService } from 'app/entities/projetoBaseChronus/unidade-atendimento/unidade-atendimento.service';
import { UnidadeAtendimento } from 'app/shared/model/projetoBaseChronus/unidade-atendimento.model';

describe('Component Tests', () => {
  describe('UnidadeAtendimento Management Component', () => {
    let comp: UnidadeAtendimentoComponent;
    let fixture: ComponentFixture<UnidadeAtendimentoComponent>;
    let service: UnidadeAtendimentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoBaseChronusGatewayTestModule],
        declarations: [UnidadeAtendimentoComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: {
                subscribe: (fn: (value: Data) => void) =>
                  fn({
                    pagingParams: {
                      predicate: 'id',
                      reverse: false,
                      page: 0,
                    },
                  }),
              },
              queryParamMap: {
                subscribe: (fn: (value: Data) => void) =>
                  fn(
                    convertToParamMap({
                      page: '1',
                      size: '1',
                      sort: 'id,desc',
                    })
                  ),
              },
            },
          },
        ],
      })
        .overrideTemplate(UnidadeAtendimentoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UnidadeAtendimentoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UnidadeAtendimentoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UnidadeAtendimento('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.unidadeAtendimentos && comp.unidadeAtendimentos[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UnidadeAtendimento('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.unidadeAtendimentos && comp.unidadeAtendimentos[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
