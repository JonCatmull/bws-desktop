import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { DealershipService } from '../services/dealership.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    dealershipSelect: FormControl;

    constructor(public authService: AuthService, public dealershipService: DealershipService) {
        this.dealershipSelect = new FormControl('',Validators.required);

        this.dealershipSelect.valueChanges.subscribe(val => {
            this.dealershipService.setDealershipId(val);
        });
    }

    ngOnInit() {
    }

}
