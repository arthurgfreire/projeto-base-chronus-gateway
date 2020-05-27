import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap, Data } from '@angular/router';

import { ProjetoBaseChronusGatewayTestModule } from '../../../../test.module';
import { TipoSanguineoComponent } from 'app/entities/projetoBaseChronus/tipo-sanguineo/tipo-sanguineo.component';
import { TipoSanguineoService } from 'app/entities/projetoBaseChronus/tipo-sanguineo/tipo-sanguineo.service';
import { TipoSanguineo } from 'app/shared/model/projetoBaseChronus/tipo-sanguineo.model';

describe('Component Tests', () => {
  describe('TipoSanguineo Management Component', () => {
    let comp: TipoSanguineoComponent;
    let fixture: ComponentFixture<TipoSanguineoComponent>;
    let service: TipoSanguineoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoBaseChronusGatewayTestModule],
        declarations: [TipoSanguineoComponent],
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
        .overrideTemplate(TipoSanguineoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoSanguineoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoSanguineoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoSanguineo('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoSanguineos && comp.tipoSanguineos[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoSanguineo('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoSanguineos && comp.tipoSanguineos[0]).toEqual(jasmine.objectContaining({ id: '123' }));
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
