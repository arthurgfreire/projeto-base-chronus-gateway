import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IClassificacaoUsuario } from 'app/shared/model/projetoBaseChronus/classificacao-usuario.model';

type EntityResponseType = HttpResponse<IClassificacaoUsuario>;
type EntityArrayResponseType = HttpResponse<IClassificacaoUsuario[]>;

@Injectable({ providedIn: 'root' })
export class ClassificacaoUsuarioService {
  public resourceUrl = SERVER_API_URL + 'services/projetobasechronus/api/classificacao-usuarios';

  constructor(protected http: HttpClient) {}

  create(classificacaoUsuario: IClassificacaoUsuario): Observable<EntityResponseType> {
    return this.http.post<IClassificacaoUsuario>(this.resourceUrl, classificacaoUsuario, { observe: 'response' });
  }

  update(classificacaoUsuario: IClassificacaoUsuario): Observable<EntityResponseType> {
    return this.http.put<IClassificacaoUsuario>(this.resourceUrl, classificacaoUsuario, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IClassificacaoUsuario>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IClassificacaoUsuario[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
