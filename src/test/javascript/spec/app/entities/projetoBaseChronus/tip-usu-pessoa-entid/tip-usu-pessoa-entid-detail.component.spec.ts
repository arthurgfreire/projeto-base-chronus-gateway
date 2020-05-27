import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetoBaseChronusGatewayTestModule } from '../../../../test.module';
import { TipUsuPessoaEntidDetailComponent } from 'app/entities/projetoBaseChronus/tip-usu-pessoa-entid/tip-usu-pessoa-entid-detail.component';
import { TipUsuPessoaEntid } from 'app/shared/model/projetoBaseChronus/tip-usu-pessoa-entid.model';

describe('Component Tests', () => {
  describe('TipUsuPessoaEntid Management Detail Component', () => {
    let comp: TipUsuPessoaEntidDetailComponent;
    let fixture: ComponentFixture<TipUsuPessoaEntidDetailComponent>;
    const route = ({ data: of({ tipUsuPessoaEntid: new TipUsuPessoaEntid('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoBaseChronusGatewayTestModule],
        declarations: [TipUsuPessoaEntidDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TipUsuPessoaEntidDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipUsuPessoaEntidDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tipUsuPessoaEntid on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipUsuPessoaEntid).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
