import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  eatName: any;
  error = ''
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.eatName = {name: "", cuisine: ""}
   }

   ngOnInit() {
    this._route.params.subscribe((params: Params)=>{
      this.getEat(params['id'])
    });
  }
  getEat(id){
    let observable = this._httpService.getEat(id)
    observable.subscribe(data=>{
      this.eatName = data['data']
    })
  };
  addEats(id){
    if(this.eatName.name.length <=3){
      this.error = "Name must be 3 characters long"
    }
    else{
      let observable = this._httpService.editEat(this.eatName)
      observable.subscribe(data=>{
      this.eatName = {name: "", cuisine: ""}
      this.getHome(id)
      })
    }
  }
  getHome(id){
    this._router.navigate(['/home'])
  };
}
