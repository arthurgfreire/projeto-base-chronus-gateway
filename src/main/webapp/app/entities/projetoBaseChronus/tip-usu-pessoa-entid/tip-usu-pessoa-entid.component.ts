import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipUsuPessoaEntid } from 'app/shared/model/projetoBaseChronus/tip-usu-pessoa-entid.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { TipUsuPessoaEntidService } from './tip-usu-pessoa-entid.service';
import { TipUsuPessoaEntidDeleteDialogComponent } from './tip-usu-pessoa-entid-delete-dialog.component';

@Component({
  selector: 'jhi-tip-usu-pessoa-entid',
  templateUrl: './tip-usu-pessoa-entid.component.html',
})
export class TipUsuPessoaEntidComponent implements OnInit, OnDestroy {
  tipUsuPessoaEntids?: ITipUsuPessoaEntid[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected tipUsuPessoaEntidService: TipUsuPessoaEntidService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.tipUsuPessoaEntidService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<ITipUsuPessoaEntid[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.handleBackNavigation();
    this.registerChangeInTipUsuPessoaEntids();
  }

  handleBackNavigation(): void {
    this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {
      const prevPage = params.get('page');
      const prevSort = params.get('sort');
      const prevSortSplit = prevSort?.split(',');
      if (prevSortSplit) {
        this.predicate = prevSortSplit[0];
        this.ascending = prevSortSplit[1] === 'asc';
      }
      if (prevPage && +prevPage !== this.page) {
        this.ngbPaginationPage = +prevPage;
        this.loadPage(+prevPage);
      } else {
        this.loadPage(this.page);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITipUsuPessoaEntid): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTipUsuPessoaEntids(): void {
    this.eventSubscriber = this.eventManager.subscribe('tipUsuPessoaEntidListModification', () => this.loadPage());
  }

  delete(tipUsuPessoaEntid: ITipUsuPessoaEntid): void {
    const modalRef = this.modalService.open(TipUsuPessoaEntidDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipUsuPessoaEntid = tipUsuPessoaEntid;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: ITipUsuPessoaEntid[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/tip-usu-pessoa-entid'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
      },
    });
    this.tipUsuPessoaEntids = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
