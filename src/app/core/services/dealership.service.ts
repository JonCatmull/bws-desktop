import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

// import { dealership } from '../interfaces/dealership.interface';

@Injectable({
  providedIn: 'root'
})
export class DealershipService {

    private _dealershipId: number = parseInt(localStorage.getItem('dealershipId')) || null;
    private dealershipIdSubject: BehaviorSubject<number>;

    constructor() {
        this.dealershipIdSubject = new BehaviorSubject(this._dealershipId);
    }

    get dealershipId$(): Observable<number> {
        return this.dealershipIdSubject.asObservable();
    }

    get dealershipId(): number {
        return this._dealershipId;
    }

    set dealershipId(id: number) {
        console.log('dealership Id ',id);
        localStorage.setItem('dealershipId',id.toString());
        this._dealershipId = id;
        this.dealershipIdSubject.next(this._dealershipId);
    }
}
