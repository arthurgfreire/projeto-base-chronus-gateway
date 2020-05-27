import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProjetoBaseChronusGatewayTestModule } from '../../../../test.module';
import { EntidadeUpdateComponent } from 'app/entities/projetoBaseChronus/entidade/entidade-update.component';
import { EntidadeService } from 'app/entities/projetoBaseChronus/entidade/entidade.service';
import { Entidade } from 'app/shared/model/projetoBaseChronus/entidade.model';

describe('Component Tests', () => {
  describe('Entidade Management Update Component', () => {
    let comp: EntidadeUpdateComponent;
    let fixture: ComponentFixture<EntidadeUpdateComponent>;
    let service: EntidadeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoBaseChronusGatewayTestModule],
        declarations: [EntidadeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(EntidadeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EntidadeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EntidadeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Entidade('123');
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
        const entity = new Entidade();
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
