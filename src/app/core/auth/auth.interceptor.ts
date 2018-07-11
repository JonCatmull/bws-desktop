
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem("token");

        if (req.url.startsWith('/api')) {
            req = req.clone({
                url: environment.API + req.url
            });
        }

        if (token) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + token)
            });

            return next.handle(cloned);
            // .do((event: HttpEvent<any>) => {
            //     if (event instanceof HttpResponse) {
            //         this.authService.resetLogoutTimer();
            //     }
            // }, (err: any) => {
            //     if (err instanceof HttpErrorResponse) {
            //         if (err.status === 401) {
            //             this.authService.logout();
            //         }
            //     }
            // });
        } else {
            return next.handle(req);
        }
    }
}
