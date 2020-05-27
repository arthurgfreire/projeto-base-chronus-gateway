import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetoBaseChronusGatewayTestModule } from '../../../../test.module';
import { RacaDetailComponent } from 'app/entities/projetoBaseChronus/raca/raca-detail.component';
import { Raca } from 'app/shared/model/projetoBaseChronus/raca.model';

describe('Component Tests', () => {
  describe('Raca Management Detail Component', () => {
    let comp: RacaDetailComponent;
    let fixture: ComponentFixture<RacaDetailComponent>;
    const route = ({ data: of({ raca: new Raca('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoBaseChronusGatewayTestModule],
        declarations: [RacaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RacaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RacaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load raca on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.raca).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
