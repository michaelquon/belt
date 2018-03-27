import { Component, OnInit } from '@angular/core';
import { HttpService} from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  eats = [];
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getEats();
  }

  getEats(){
    let observable = this._httpService.getEats();
    observable.subscribe(data => {console.log("Got all rest", data)
    this.eats = data['data']
  })
  };
  deleteEat(id){
    let observable = this._httpService.deleteEat(id)
    observable.subscribe(data =>{ console.log("Rest was removed")
    this.getHome();
    })
  };
  getNew(){
    this._router.navigate(['/new'])
  };
  getReview(id){
    this._router.navigate(['/review/'+id])
  };
  getEdit(id){
    this._router.navigate(['/edit/'+id])
  }
  getHome(){
    this._router.navigate(['/home'])
  }
}
