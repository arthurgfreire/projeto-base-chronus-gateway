import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IClassificacaoUsuario, ClassificacaoUsuario } from 'app/shared/model/projetoBaseChronus/classificacao-usuario.model';
import { ClassificacaoUsuarioService } from './classificacao-usuario.service';
import { ClassificacaoUsuarioComponent } from './classificacao-usuario.component';
import { ClassificacaoUsuarioDetailComponent } from './classificacao-usuario-detail.component';
import { ClassificacaoUsuarioUpdateComponent } from './classificacao-usuario-update.component';

@Injectable({ providedIn: 'root' })
export class ClassificacaoUsuarioResolve implements Resolve<IClassificacaoUsuario> {
  constructor(private service: ClassificacaoUsuarioService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IClassificacaoUsuario> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((classificacaoUsuario: HttpResponse<ClassificacaoUsuario>) => {
          if (classificacaoUsuario.body) {
            return of(classificacaoUsuario.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ClassificacaoUsuario());
  }
}

export const classificacaoUsuarioRoute: Routes = [
  {
    path: '',
    component: ClassificacaoUsuarioComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams,
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'projetoBaseChronusGatewayApp.projetoBaseChronusClassificacaoUsuario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ClassificacaoUsuarioDetailComponent,
    resolve: {
      classificacaoUsuario: ClassificacaoUsuarioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoBaseChronusGatewayApp.projetoBaseChronusClassificacaoUsuario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ClassificacaoUsuarioUpdateComponent,
    resolve: {
      classificacaoUsuario: ClassificacaoUsuarioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoBaseChronusGatewayApp.projetoBaseChronusClassificacaoUsuario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ClassificacaoUsuarioUpdateComponent,
    resolve: {
      classificacaoUsuario: ClassificacaoUsuarioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoBaseChronusGatewayApp.projetoBaseChronusClassificacaoUsuario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
