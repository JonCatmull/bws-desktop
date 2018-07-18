import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { }

    log(websiteId: number, message: string, extra?: any) {
        const payload: any = {websiteId, message, ...extra};
        return this.http.post<any[]>(`@api/talon-log`, payload);
    }
}
