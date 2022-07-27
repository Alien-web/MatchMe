import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any={};
  loggedIn:boolean=false;

  constructor(public _accountService: AccountService) { }

  ngOnInit(): void {
  }

  login(){
    this._accountService.login(this.model).subscribe(res=>{
      console.log(res);
    },error=>{
      console.log(error);
    });
  }

  logout(){
    this._accountService.logout();
  }
}
