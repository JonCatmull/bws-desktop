import { Component, OnInit } from '@angular/core';
import { TalonService } from '../../shared/talon.service';
import { DealershipService } from '../../../core/services/dealership.service';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-talon-uploader',
    templateUrl: './talon-uploader.component.html',
    styleUrls: ['./talon-uploader.component.scss']
})
export class TalonUploaderComponent implements OnInit {

    btnDisabled = false;

    constructor(public dealershipService: DealershipService, public talonService: TalonService) { }

    ngOnInit() {
        // this.dealershipService.dealershipId$.pipe(
        //     // switchMap(id => this.talonService.fetchTalonCredentials(id))
        // ).subscribe(dbCredentials => {
        //     console.log('db details:',dbCredentials);
        // });
    }

    uploadNow() {
        this.btnDisabled = true;
        this.talonService.fetchBikesAndUpload(this.dealershipService.dealershipId).subscribe(
            resp => {
                console.log('uPLOADnow RESP',resp);
            }, console.error,
            () => this.btnDisabled = false
        );
    }

}
