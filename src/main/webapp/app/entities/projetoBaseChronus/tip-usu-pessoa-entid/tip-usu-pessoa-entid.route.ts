import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITipUsuPessoaEntid, TipUsuPessoaEntid } from 'app/shared/model/projetoBaseChronus/tip-usu-pessoa-entid.model';
import { TipUsuPessoaEntidService } from './tip-usu-pessoa-entid.service';
import { TipUsuPessoaEntidComponent } from './tip-usu-pessoa-entid.component';
import { TipUsuPessoaEntidDetailComponent } from './tip-usu-pessoa-entid-detail.component';
import { TipUsuPessoaEntidUpdateComponent } from './tip-usu-pessoa-entid-update.component';

@Injectable({ providedIn: 'root' })
export class TipUsuPessoaEntidResolve implements Resolve<ITipUsuPessoaEntid> {
  constructor(private service: TipUsuPessoaEntidService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipUsuPessoaEntid> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tipUsuPessoaEntid: HttpResponse<TipUsuPessoaEntid>) => {
          if (tipUsuPessoaEntid.body) {
            return of(tipUsuPessoaEntid.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipUsuPessoaEntid());
  }
}

export const tipUsuPessoaEntidRoute: Routes = [
  {
    path: '',
    component: TipUsuPessoaEntidComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams,
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'projetoBaseChronusGatewayApp.projetoBaseChronusTipUsuPessoaEntid.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipUsuPessoaEntidDetailComponent,
    resolve: {
      tipUsuPessoaEntid: TipUsuPessoaEntidResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoBaseChronusGatewayApp.projetoBaseChronusTipUsuPessoaEntid.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipUsuPessoaEntidUpdateComponent,
    resolve: {
      tipUsuPessoaEntid: TipUsuPessoaEntidResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoBaseChronusGatewayApp.projetoBaseChronusTipUsuPessoaEntid.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipUsuPessoaEntidUpdateComponent,
    resolve: {
      tipUsuPessoaEntid: TipUsuPessoaEntidResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoBaseChronusGatewayApp.projetoBaseChronusTipUsuPessoaEntid.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
