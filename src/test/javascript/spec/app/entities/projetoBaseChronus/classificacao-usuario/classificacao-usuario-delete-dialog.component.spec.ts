import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProjetoBaseChronusGatewayTestModule } from '../../../../test.module';
import { MockEventManager } from '../../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../../helpers/mock-active-modal.service';
import { ClassificacaoUsuarioDeleteDialogComponent } from 'app/entities/projetoBaseChronus/classificacao-usuario/classificacao-usuario-delete-dialog.component';
import { ClassificacaoUsuarioService } from 'app/entities/projetoBaseChronus/classificacao-usuario/classificacao-usuario.service';

describe('Component Tests', () => {
  describe('ClassificacaoUsuario Management Delete Component', () => {
    let comp: ClassificacaoUsuarioDeleteDialogComponent;
    let fixture: ComponentFixture<ClassificacaoUsuarioDeleteDialogComponent>;
    let service: ClassificacaoUsuarioService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProjetoBaseChronusGatewayTestModule],
        declarations: [ClassificacaoUsuarioDeleteDialogComponent],
      })
        .overrideTemplate(ClassificacaoUsuarioDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ClassificacaoUsuarioDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClassificacaoUsuarioService);
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
