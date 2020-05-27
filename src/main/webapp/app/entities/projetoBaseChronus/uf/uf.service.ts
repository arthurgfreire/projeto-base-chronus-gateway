import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUf } from 'app/shared/model/projetoBaseChronus/uf.model';

type EntityResponseType = HttpResponse<IUf>;
type EntityArrayResponseType = HttpResponse<IUf[]>;

@Injectable({ providedIn: 'root' })
export class UfService {
  public resourceUrl = SERVER_API_URL + 'services/projetobasechronus/api/ufs';

  constructor(protected http: HttpClient) {}

  create(uf: IUf): Observable<EntityResponseType> {
    return this.http.post<IUf>(this.resourceUrl, uf, { observe: 'response' });
  }

  update(uf: IUf): Observable<EntityResponseType> {
    return this.http.put<IUf>(this.resourceUrl, uf, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IUf>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUf[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
