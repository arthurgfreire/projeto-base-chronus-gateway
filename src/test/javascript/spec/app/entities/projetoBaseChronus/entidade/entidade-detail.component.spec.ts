import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetoBaseChronusGatewayTestModule } from '../../../../test.module';
import { EntidadeDetailComponent } from 'app/entities/projetoBaseChronus/entidade/entidade-detail.component';
import { Entidade } from 'app/shared/model/projetoBaseChronus/entidade.model';

describe('Component Tests', () => {
  describe('Entidade Management Detail Component', () => {
    let comp: EntidadeDetailComponent;
    let fixture: ComponentFixture<EntidadeDetailComponent>;
    const route = ({ data: of({ entidade: new Entidade('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoBaseChronusGatewayTestModule],
        declarations: [EntidadeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EntidadeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EntidadeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load entidade on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.entidade).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
