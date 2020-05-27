import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProjetoBaseChronusGatewayTestModule } from '../../../../test.module';
import { MockEventManager } from '../../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../../helpers/mock-active-modal.service';
import { UnidadeAtendimentoDeleteDialogComponent } from 'app/entities/projetoBaseChronus/unidade-atendimento/unidade-atendimento-delete-dialog.component';
import { UnidadeAtendimentoService } from 'app/entities/projetoBaseChronus/unidade-atendimento/unidade-atendimento.service';

describe('Component Tests', () => {
  describe('UnidadeAtendimento Management Delete Component', () => {
    let comp: UnidadeAtendimentoDeleteDialogComponent;
    let fixture: ComponentFixture<UnidadeAtendimentoDeleteDialogComponent>;
    let service: UnidadeAtendimentoService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoBaseChronusGatewayTestModule],
        declarations: [UnidadeAtendimentoDeleteDialogComponent],
      })
        .overrideTemplate(UnidadeAtendimentoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UnidadeAtendimentoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UnidadeAtendimentoService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('123');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('123');
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
