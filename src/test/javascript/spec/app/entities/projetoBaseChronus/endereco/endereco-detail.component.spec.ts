import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetoBaseChronusGatewayTestModule } from '../../../../test.module';
import { EnderecoDetailComponent } from 'app/entities/projetoBaseChronus/endereco/endereco-detail.component';
import { Endereco } from 'app/shared/model/projetoBaseChronus/endereco.model';

describe('Component Tests', () => {
  describe('Endereco Management Detail Component', () => {
    let comp: EnderecoDetailComponent;
    let fixture: ComponentFixture<EnderecoDetailComponent>;
    const route = ({ data: of({ endereco: new Endereco('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoBaseChronusGatewayTestModule],
        declarations: [EnderecoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EnderecoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EnderecoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load endereco on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.endereco).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
