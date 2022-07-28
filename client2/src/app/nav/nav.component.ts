import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any={};
  loggedIn:boolean=false;

  constructor(public _accountService: AccountService,
    private _route: Router,private _toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    this._accountService.login(this.model).subscribe(res=>{
      console.log(res);
      this._route.navigateByUrl('/members');
    },error=>{
      console.log(error);
      this._toastr.error(error.error);
    });
  }

  logout(){
    this._accountService.logout();
    this._route.navigateByUrl('/');
  }
}
