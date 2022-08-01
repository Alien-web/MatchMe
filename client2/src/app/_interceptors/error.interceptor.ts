import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _route:Router, private _toastr:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error=>{
        switch(error.status){
          case 400:
            if(error.error.errors){
              const modalstateErrors=[];
              for(const key in error.error.errors){
                modalstateErrors.push[error.error.errors[key]];
              }
              throw modalstateErrors.flat();
            }
            else{
              this._toastr.error(error.statustext,error.status);
            }
            break;
          case 401:
            this._toastr.error(error.statustext,error.status);
            break;
          case 404:
            this._route.navigateByUrl('/not-found');
            break;
          case 404:
            const navigationExtras:NavigationExtras={state:{error:error.error}}
            this._route.navigateByUrl('/server-error',navigationExtras);
            break;
          default: 
            this._toastr.error("something unexpected went wrong");
            console.log(error);
          break;
        }
        return throwError(error);
      })
    )
  }
}
