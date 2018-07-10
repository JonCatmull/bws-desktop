import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    // private _websiteId: number;
    // private websiteIdSubject: BehaviorSubject<number> = new BehaviorSubject(null);

    // constructor() {
    //     const websiteId = localStorage.getItem('websiteId');
    //     if (websiteId) this.setWebsiteId(parseInt(websiteId));
    // }

    // get websiteId(): Observable<number> {
    //     return this.websiteIdSubject.asObservable();
    // }

    // setWebsiteId(id: number) {
    //     this._websiteId = id;
    //     this.websiteIdSubject.next(id);
    // }
}
