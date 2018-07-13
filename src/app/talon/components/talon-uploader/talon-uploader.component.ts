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

    constructor(public dealershipService: DealershipService, public talonService: TalonService) { }

    ngOnInit() {
        this.dealershipService.dealershipId$.pipe(
            switchMap(id => this.talonService.fetchTalonCredentials(id))
        ).subscribe(dbCredentials => {
            console.log('db details:',dbCredentials);
        });
    }

}
