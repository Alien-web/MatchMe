import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-reister',
  templateUrl: './reister.component.html',
  styleUrls: ['./reister.component.css']
})
export class ReisterComponent implements OnInit {
  @Output() cancelRegister=new EventEmitter();
  model:any={};

  constructor(private _accountService:AccountService,private _toastr : ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    this._accountService.register(this.model).subscribe(res=>{
      console.log(res)
      this.cancel();
    },error=>{
      this._toastr.error(error.error);
    })
  }
  cancel(){
    this.cancelRegister.emit(false);
  }
}
