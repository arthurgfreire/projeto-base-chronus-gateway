import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetoBaseChronusGatewayTestModule } from '../../../../test.module';
import { UnidadeAtendimentoDetailComponent } from 'app/entities/projetoBaseChronus/unidade-atendimento/unidade-atendimento-detail.component';
import { UnidadeAtendimento } from 'app/shared/model/projetoBaseChronus/unidade-atendimento.model';

describe('Component Tests', () => {
  describe('UnidadeAtendimento Management Detail Component', () => {
    let comp: UnidadeAtendimentoDetailComponent;
    let fixture: ComponentFixture<UnidadeAtendimentoDetailComponent>;
    const route = ({ data: of({ unidadeAtendimento: new UnidadeAtendimento('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoBaseChronusGatewayTestModule],
        declarations: [UnidadeAtendimentoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UnidadeAtendimentoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UnidadeAtendimentoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load unidadeAtendimento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.unidadeAtendimento).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
