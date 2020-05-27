import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProjetoBaseChronusGatewayTestModule } from '../../../../test.module';
import { ClassificacaoUsuarioUpdateComponent } from 'app/entities/projetoBaseChronus/classificacao-usuario/classificacao-usuario-update.component';
import { ClassificacaoUsuarioService } from 'app/entities/projetoBaseChronus/classificacao-usuario/classificacao-usuario.service';
import { ClassificacaoUsuario } from 'app/shared/model/projetoBaseChronus/classificacao-usuario.model';

describe('Component Tests', () => {
  describe('ClassificacaoUsuario Management Update Component', () => {
    let comp: ClassificacaoUsuarioUpdateComponent;
    let fixture: ComponentFixture<ClassificacaoUsuarioUpdateComponent>;
    let service: ClassificacaoUsuarioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoBaseChronusGatewayTestModule],
        declarations: [ClassificacaoUsuarioUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ClassificacaoUsuarioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ClassificacaoUsuarioUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClassificacaoUsuarioService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ClassificacaoUsuario('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ClassificacaoUsuario();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
