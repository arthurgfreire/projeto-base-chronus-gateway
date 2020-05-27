import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUnidadeAtendimento } from 'app/shared/model/projetoBaseChronus/unidade-atendimento.model';

type EntityResponseType = HttpResponse<IUnidadeAtendimento>;
type EntityArrayResponseType = HttpResponse<IUnidadeAtendimento[]>;

@Injectable({ providedIn: 'root' })
export class UnidadeAtendimentoService {
  public resourceUrl = SERVER_API_URL + 'services/projetobasechronus/api/unidade-atendimentos';

  constructor(protected http: HttpClient) {}

  create(unidadeAtendimento: IUnidadeAtendimento): Observable<EntityResponseType> {
    return this.http.post<IUnidadeAtendimento>(this.resourceUrl, unidadeAtendimento, { observe: 'response' });
  }

  update(unidadeAtendimento: IUnidadeAtendimento): Observable<EntityResponseType> {
    return this.http.put<IUnidadeAtendimento>(this.resourceUrl, unidadeAtendimento, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IUnidadeAtendimento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUnidadeAtendimento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
