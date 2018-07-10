import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Util } from '../../../core/util/util';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-talon-scheduler',
  templateUrl: './talon-scheduler.component.html',
  styleUrls: ['./talon-scheduler.component.scss']
})
export class TalonSchedulerComponent implements OnInit {

    schedulerForm: FormGroup;

    durationOptions = [
        {label:'24 hours',value:1},
        {label:'7 days',value:7},
    ];

    constructor(public authService: AuthService,
                private fb:FormBuilder) {

        this.schedulerForm = this.fb.group({
            startDate: ['',Validators.required],
            repeat: false,
            intervalDuration: [{ value:'1', disabled: true}]
        });

        this.schedulerForm.get('repeat').valueChanges.subscribe(val => {
            this.schedulerForm.get('intervalDuration')[val?'enable':'disable']();
        });
    }

    ngOnInit() {
    }

    save() {

    }

}
