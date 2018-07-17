import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { DealershipService } from '../services/dealership.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    dealershipSelect: FormControl;

    constructor(public authService: AuthService, public dealershipService: DealershipService) {
        // this.dealershipSelect = new FormControl('',Validators.required);
        const disabledState = (authService.user) ? Boolean(authService.user.websites.length < 2) : false;
        console.log('this.dealershipService.dealershipId',this.dealershipService.dealershipId);
        this.dealershipSelect = new FormControl({value:this.dealershipService.dealershipId, disabled: disabledState, validators: [Validators.required]});
    }

    ngOnInit() {
        this.dealershipService.dealershipId$.pipe(take(1)).subscribe(id => this.dealershipSelect.setValue(id));
        this.dealershipSelect.valueChanges.subscribe(val => {
            this.dealershipService.dealershipId = parseInt(val);
        });
    }

}
