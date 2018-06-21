import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private fb:FormBuilder,
                 private authService: AuthService,
                 private router: Router) {

        this.loginForm = this.fb.group({
            email: ['jonathan.catmull@room58.com',Validators.required],
            password: ['jon',Validators.required]
        });
    }

    ngOnInit() {
    }

    login() {
        const val = this.loginForm.value;

        if (val.email && val.password) {
            this.authService.login(val.email, val.password)
                .subscribe(
                    () => {
                        console.log("User is logged in");
                        this.router.navigateByUrl('/');
                    }
                );
        }
    }
}
