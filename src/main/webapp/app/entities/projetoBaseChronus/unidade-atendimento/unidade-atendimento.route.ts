import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUnidadeAtendimento, UnidadeAtendimento } from 'app/shared/model/projetoBaseChronus/unidade-atendimento.model';
import { UnidadeAtendimentoService } from './unidade-atendimento.service';
import { UnidadeAtendimentoComponent } from './unidade-atendimento.component';
import { UnidadeAtendimentoDetailComponent } from './unidade-atendimento-detail.component';
import { UnidadeAtendimentoUpdateComponent } from './unidade-atendimento-update.component';

@Injectable({ providedIn: 'root' })
export class UnidadeAtendimentoResolve implements Resolve<IUnidadeAtendimento> {
  constructor(private service: UnidadeAtendimentoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUnidadeAtendimento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((unidadeAtendimento: HttpResponse<UnidadeAtendimento>) => {
          if (unidadeAtendimento.body) {
            return of(unidadeAtendimento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UnidadeAtendimento());
  }
}

export const unidadeAtendimentoRoute: Routes = [
  {
    path: '',
    component: UnidadeAtendimentoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams,
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'projetoBaseChronusGatewayApp.projetoBaseChronusUnidadeAtendimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UnidadeAtendimentoDetailComponent,
    resolve: {
      unidadeAtendimento: UnidadeAtendimentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoBaseChronusGatewayApp.projetoBaseChronusUnidadeAtendimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UnidadeAtendimentoUpdateComponent,
    resolve: {
      unidadeAtendimento: UnidadeAtendimentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoBaseChronusGatewayApp.projetoBaseChronusUnidadeAtendimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UnidadeAtendimentoUpdateComponent,
    resolve: {
      unidadeAtendimento: UnidadeAtendimentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoBaseChronusGatewayApp.projetoBaseChronusUnidadeAtendimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
