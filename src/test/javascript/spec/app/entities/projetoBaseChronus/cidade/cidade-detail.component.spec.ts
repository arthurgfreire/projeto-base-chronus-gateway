import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetoBaseChronusGatewayTestModule } from '../../../../test.module';
import { CidadeDetailComponent } from 'app/entities/projetoBaseChronus/cidade/cidade-detail.component';
import { Cidade } from 'app/shared/model/projetoBaseChronus/cidade.model';

describe('Component Tests', () => {
  describe('Cidade Management Detail Component', () => {
    let comp: CidadeDetailComponent;
    let fixture: ComponentFixture<CidadeDetailComponent>;
    const route = ({ data: of({ cidade: new Cidade('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoBaseChronusGatewayTestModule],
        declarations: [CidadeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CidadeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CidadeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cidade on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cidade).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
