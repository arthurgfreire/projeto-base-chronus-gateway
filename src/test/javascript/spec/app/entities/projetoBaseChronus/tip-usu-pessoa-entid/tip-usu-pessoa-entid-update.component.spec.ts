import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProjetoBaseChronusGatewayTestModule } from '../../../../test.module';
import { TipUsuPessoaEntidUpdateComponent } from 'app/entities/projetoBaseChronus/tip-usu-pessoa-entid/tip-usu-pessoa-entid-update.component';
import { TipUsuPessoaEntidService } from 'app/entities/projetoBaseChronus/tip-usu-pessoa-entid/tip-usu-pessoa-entid.service';
import { TipUsuPessoaEntid } from 'app/shared/model/projetoBaseChronus/tip-usu-pessoa-entid.model';

describe('Component Tests', () => {
  describe('TipUsuPessoaEntid Management Update Component', () => {
    let comp: TipUsuPessoaEntidUpdateComponent;
    let fixture: ComponentFixture<TipUsuPessoaEntidUpdateComponent>;
    let service: TipUsuPessoaEntidService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoBaseChronusGatewayTestModule],
        declarations: [TipUsuPessoaEntidUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TipUsuPessoaEntidUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipUsuPessoaEntidUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipUsuPessoaEntidService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipUsuPessoaEntid('123');
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
        const entity = new TipUsuPessoaEntid();
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
