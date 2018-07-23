import { Component, OnInit } from '@angular/core';
import { TalonService } from '../../shared/talon.service';

@Component({
  selector: 'app-talon-page',
  templateUrl: './talon-page.component.html',
  styleUrls: ['./talon-page.component.scss']
})
export class TalonPageComponent implements OnInit {

    lastImported: string;

    constructor(public talonService: TalonService) { }
        // public dealershipService: DealershipService

    ngOnInit() {

        // this.talonService.lastImported

        // this.dealershipService.dealershipId$.pipe(
        //     switchMap(id => this.talonService.fetchTalonCredentials(id))
        // ).subscribe(
        //     talonConfig => this.lastImported = talonConfig.lastImportedAt
        // );
    }

}
