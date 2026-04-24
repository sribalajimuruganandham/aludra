import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DynamicTableService {
  constructor(private http: HttpClient) {}

  getData<T>(api: string): Observable<T[]> {
    return this.http.get<T[]>(api);
  }

  updateRow<T>(api: string, id: number, payload: T): Observable<T> {
    return this.http.put<T>(`${api}/${id}`, payload);
  }
}
