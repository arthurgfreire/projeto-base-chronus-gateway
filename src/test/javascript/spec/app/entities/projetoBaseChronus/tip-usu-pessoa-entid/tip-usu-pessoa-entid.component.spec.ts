import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap, Data } from '@angular/router';

import { ProjetoBaseChronusGatewayTestModule } from '../../../../test.module';
import { TipUsuPessoaEntidComponent } from 'app/entities/projetoBaseChronus/tip-usu-pessoa-entid/tip-usu-pessoa-entid.component';
import { TipUsuPessoaEntidService } from 'app/entities/projetoBaseChronus/tip-usu-pessoa-entid/tip-usu-pessoa-entid.service';
import { TipUsuPessoaEntid } from 'app/shared/model/projetoBaseChronus/tip-usu-pessoa-entid.model';

describe('Component Tests', () => {
  describe('TipUsuPessoaEntid Management Component', () => {
    let comp: TipUsuPessoaEntidComponent;
    let fixture: ComponentFixture<TipUsuPessoaEntidComponent>;
    let service: TipUsuPessoaEntidService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoBaseChronusGatewayTestModule],
        declarations: [TipUsuPessoaEntidComponent],
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
        .overrideTemplate(TipUsuPessoaEntidComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipUsuPessoaEntidComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipUsuPessoaEntidService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipUsuPessoaEntid('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipUsuPessoaEntids && comp.tipUsuPessoaEntids[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipUsuPessoaEntid('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipUsuPessoaEntids && comp.tipUsuPessoaEntids[0]).toEqual(jasmine.objectContaining({ id: '123' }));
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
