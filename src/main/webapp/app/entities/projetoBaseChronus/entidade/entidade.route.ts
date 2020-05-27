import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEntidade, Entidade } from 'app/shared/model/projetoBaseChronus/entidade.model';
import { EntidadeService } from './entidade.service';
import { EntidadeComponent } from './entidade.component';
import { EntidadeDetailComponent } from './entidade-detail.component';
import { EntidadeUpdateComponent } from './entidade-update.component';

@Injectable({ providedIn: 'root' })
export class EntidadeResolve implements Resolve<IEntidade> {
  constructor(private service: EntidadeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEntidade> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((entidade: HttpResponse<Entidade>) => {
          if (entidade.body) {
            return of(entidade.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Entidade());
  }
}

export const entidadeRoute: Routes = [
  {
    path: '',
    component: EntidadeComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams,
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'projetoBaseChronusGatewayApp.projetoBaseChronusEntidade.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EntidadeDetailComponent,
    resolve: {
      entidade: EntidadeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoBaseChronusGatewayApp.projetoBaseChronusEntidade.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EntidadeUpdateComponent,
    resolve: {
      entidade: EntidadeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoBaseChronusGatewayApp.projetoBaseChronusEntidade.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EntidadeUpdateComponent,
    resolve: {
      entidade: EntidadeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoBaseChronusGatewayApp.projetoBaseChronusEntidade.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
