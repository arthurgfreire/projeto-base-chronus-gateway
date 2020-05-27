import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUf, Uf } from 'app/shared/model/projetoBaseChronus/uf.model';
import { UfService } from './uf.service';
import { UfComponent } from './uf.component';
import { UfDetailComponent } from './uf-detail.component';
import { UfUpdateComponent } from './uf-update.component';

@Injectable({ providedIn: 'root' })
export class UfResolve implements Resolve<IUf> {
  constructor(private service: UfService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUf> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((uf: HttpResponse<Uf>) => {
          if (uf.body) {
            return of(uf.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Uf());
  }
}

export const ufRoute: Routes = [
  {
    path: '',
    component: UfComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams,
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'projetoBaseChronusGatewayApp.projetoBaseChronusUf.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UfDetailComponent,
    resolve: {
      uf: UfResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoBaseChronusGatewayApp.projetoBaseChronusUf.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UfUpdateComponent,
    resolve: {
      uf: UfResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoBaseChronusGatewayApp.projetoBaseChronusUf.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UfUpdateComponent,
    resolve: {
      uf: UfResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'projetoBaseChronusGatewayApp.projetoBaseChronusUf.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
