import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Dating App';

  constructor(private _accountService:AccountService){}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user:User=JSON.parse(localStorage.getItem('user'));
    this._accountService.setCurrentUser(user);
  }
}
