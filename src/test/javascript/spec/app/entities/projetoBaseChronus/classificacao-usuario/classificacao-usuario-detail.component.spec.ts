import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetoBaseChronusGatewayTestModule } from '../../../../test.module';
import { ClassificacaoUsuarioDetailComponent } from 'app/entities/projetoBaseChronus/classificacao-usuario/classificacao-usuario-detail.component';
import { ClassificacaoUsuario } from 'app/shared/model/projetoBaseChronus/classificacao-usuario.model';

describe('Component Tests', () => {
  describe('ClassificacaoUsuario Management Detail Component', () => {
    let comp: ClassificacaoUsuarioDetailComponent;
    let fixture: ComponentFixture<ClassificacaoUsuarioDetailComponent>;
    const route = ({ data: of({ classificacaoUsuario: new ClassificacaoUsuario('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoBaseChronusGatewayTestModule],
        declarations: [ClassificacaoUsuarioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ClassificacaoUsuarioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ClassificacaoUsuarioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load classificacaoUsuario on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.classificacaoUsuario).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
