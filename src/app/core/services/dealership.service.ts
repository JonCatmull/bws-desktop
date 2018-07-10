import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DealershipService {

    private _dealershipId: number;
    private dealershipIdSubject: BehaviorSubject<number> = new BehaviorSubject(null);

    constructor() {
        const dealershipId = localStorage.getItem('dealershipId');
        if (dealershipId) this.setDealershipId(parseInt(dealershipId));
    }

    get dealershipId(): Observable<number> {
        return this.dealershipIdSubject.asObservable();
    }

    setDealershipId(id: number) {
        console.log('id',id);
        this._dealershipId = id;
        this.dealershipIdSubject.next(id);
    }
}
