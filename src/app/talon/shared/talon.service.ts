import { Injectable } from '@angular/core';
import { TalonModule } from '../talon.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: TalonModule
})
export class TalonService {

    constructor(private http: HttpClient) { }

    fetchTalonCredentails(dealershipId: number) {
        return this.http.get<any>(`/api/talon-details/${dealershipId}`);
    }
}
