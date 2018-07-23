import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from "moment";

import { toDatetimeLocal } from '../../../core/util/util';
import { AuthService } from '../../../core/auth/auth.service';
import { TalonService } from '../../shared/talon.service';
import { DealershipService } from '../../../core/services/dealership.service';

@Component({
  selector: 'app-talon-scheduler',
  templateUrl: './talon-scheduler.component.html',
  styleUrls: ['./talon-scheduler.component.scss']
})
export class TalonSchedulerComponent implements OnInit {

    isActive = false;
    schedulerForm: FormGroup;

    durationOptions = [
        {label:'24 hours',value:1},
        {label:'7 days',value:7},
    ];

    constructor(public authService: AuthService,
                private formBuilder:FormBuilder,
                public dealershipService: DealershipService,
                public talonService: TalonService) {


        this.schedulerForm = this.formBuilder.group({
            startDate: ['',Validators.required],
            repeat: false,
            intervalDuration: [{ value:1, disabled: true}]
        });

        this.schedulerForm.get('repeat').valueChanges.subscribe(val => {
            this.schedulerForm.get('intervalDuration')[val?'enable':'disable']();
        });
    }

    ngOnInit() {
        // Set default value
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        console.log('setVal',toDatetimeLocal(tomorrow));
        // this.schedulerForm.controls['startDate'].setValue(tomorrow.toISOString().slice(0, -5));
        this.schedulerForm.controls['startDate'].setValue(toDatetimeLocal(tomorrow));
    }

    save() {
        this.isActive = true;
        this.talonService.scheduledUpload$.subscribe(status => console.log('status: '+status));
        this.talonService.startSchedule(this.dealershipService.dealershipId, this.schedulerForm.value).subscribe(
            resp => {
                console.log('END Bikes uploaded',resp);
            },
            err => {
                console.error('END error',err);
                this.isActive = false;
            },
            () => {
                console.log('END final');
                this.schedulerForm.enabled;
                this.isActive = false;
            }
        );
    }

}
