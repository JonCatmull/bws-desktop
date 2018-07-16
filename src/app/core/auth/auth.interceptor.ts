
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem("token");

        // TODO: Move to ApiIntereceptor class
        if (req.url.startsWith('@api')) {
            req = req.clone({
                url: environment.API + req.url.substring(4)
            });
        }

        if (token && this.authService.isLoggedIn()) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + token)
            });

            return next.handle(cloned)
                .pipe(
                    tap((event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse) {
                            this.authService.resetSessionTimer();
                        }
                    }, (err: any) => {
                        if (err instanceof HttpErrorResponse) {
                            if (err.status === 401) {
                                this.authService.logout();
                            }
                        }
                    })
                );

        } else {
            return next.handle(req);
        }
    }
}
