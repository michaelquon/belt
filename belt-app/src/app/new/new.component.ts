import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newEat: any;
  error = '';
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.newEat = {name: "", cuisine: ""}
  }

  addEats(){
    let observable = this._httpService.addEats(this.newEat);
    observable.subscribe(data => { console.log(this.error)
      if(data['error']){
       this.error = "This name is already taken"
        
      }
      else{
        console.log("A rest was added", data)
        this.newEat = {name: "", cuisine: ""}
        this.getHome()
      }
    })
  };
  getHome(){
    this._router.navigate(['/home'])
  }
}
