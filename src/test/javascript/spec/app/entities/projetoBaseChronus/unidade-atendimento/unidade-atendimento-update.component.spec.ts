import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProjetoBaseChronusGatewayTestModule } from '../../../../test.module';
import { UnidadeAtendimentoUpdateComponent } from 'app/entities/projetoBaseChronus/unidade-atendimento/unidade-atendimento-update.component';
import { UnidadeAtendimentoService } from 'app/entities/projetoBaseChronus/unidade-atendimento/unidade-atendimento.service';
import { UnidadeAtendimento } from 'app/shared/model/projetoBaseChronus/unidade-atendimento.model';

describe('Component Tests', () => {
  describe('UnidadeAtendimento Management Update Component', () => {
    let comp: UnidadeAtendimentoUpdateComponent;
    let fixture: ComponentFixture<UnidadeAtendimentoUpdateComponent>;
    let service: UnidadeAtendimentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoBaseChronusGatewayTestModule],
        declarations: [UnidadeAtendimentoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(UnidadeAtendimentoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UnidadeAtendimentoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UnidadeAtendimentoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UnidadeAtendimento('123');
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
        const entity = new UnidadeAtendimento();
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
