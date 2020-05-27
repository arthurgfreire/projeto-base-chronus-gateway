import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProjetoBaseChronusGatewayTestModule } from '../../../../test.module';
import { MockEventManager } from '../../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../../helpers/mock-active-modal.service';
import { TipUsuPessoaEntidDeleteDialogComponent } from 'app/entities/projetoBaseChronus/tip-usu-pessoa-entid/tip-usu-pessoa-entid-delete-dialog.component';
import { TipUsuPessoaEntidService } from 'app/entities/projetoBaseChronus/tip-usu-pessoa-entid/tip-usu-pessoa-entid.service';

describe('Component Tests', () => {
  describe('TipUsuPessoaEntid Management Delete Component', () => {
    let comp: TipUsuPessoaEntidDeleteDialogComponent;
    let fixture: ComponentFixture<TipUsuPessoaEntidDeleteDialogComponent>;
    let service: TipUsuPessoaEntidService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoBaseChronusGatewayTestModule],
        declarations: [TipUsuPessoaEntidDeleteDialogComponent],
      })
        .overrideTemplate(TipUsuPessoaEntidDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipUsuPessoaEntidDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipUsuPessoaEntidService);
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
