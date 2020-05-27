import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProjetoBaseChronusGatewayTestModule } from '../../../../test.module';
import { PessoaUpdateComponent } from 'app/entities/projetoBaseChronus/pessoa/pessoa-update.component';
import { PessoaService } from 'app/entities/projetoBaseChronus/pessoa/pessoa.service';
import { Pessoa } from 'app/shared/model/projetoBaseChronus/pessoa.model';

describe('Component Tests', () => {
  describe('Pessoa Management Update Component', () => {
    let comp: PessoaUpdateComponent;
    let fixture: ComponentFixture<PessoaUpdateComponent>;
    let service: PessoaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoBaseChronusGatewayTestModule],
        declarations: [PessoaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PessoaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PessoaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PessoaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Pessoa('123');
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
        const entity = new Pessoa();
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
