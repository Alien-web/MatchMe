import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _accountService:AccountService,private _toastrService: ToastrService){}
  canActivate(): Observable<boolean> {
    return this._accountService.currentUser$.pipe(
      map(user=>{
        if(user==null||user==undefined) {
          this._toastrService.error('You shall not pass!!!');
          return false;
        }
       else{
          return true;
        }
      })
    )
  }
  
}
