import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-reister',
  templateUrl: './reister.component.html',
  styleUrls: ['./reister.component.css']
})
export class ReisterComponent implements OnInit {
  @Output() cancelRegister=new EventEmitter();
  model:any={};

  constructor(private _accountService:AccountService) { }

  ngOnInit(): void {
  }

  register(){
    this._accountService.register(this.model).subscribe(res=>{
      console.log(res)
      this.cancel();
    })
  }
  cancel(){
    this.cancelRegister.emit(false);
  }
}
