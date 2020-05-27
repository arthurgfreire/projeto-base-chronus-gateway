import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetoBaseChronusGatewayTestModule } from '../../../../test.module';
import { UfDetailComponent } from 'app/entities/projetoBaseChronus/uf/uf-detail.component';
import { Uf } from 'app/shared/model/projetoBaseChronus/uf.model';

describe('Component Tests', () => {
  describe('Uf Management Detail Component', () => {
    let comp: UfDetailComponent;
    let fixture: ComponentFixture<UfDetailComponent>;
    const route = ({ data: of({ uf: new Uf('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoBaseChronusGatewayTestModule],
        declarations: [UfDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UfDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UfDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load uf on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.uf).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
