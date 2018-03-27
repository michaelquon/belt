import { Component, OnInit } from '@angular/core';
import { HttpService} from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  eats: any;
  newReview: any;
  error = '';
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.newReview = {customer: "", stars: Number, review: ''}
    this._route.params.subscribe((params: Params)=>{
    this.getEat(params['id'])
    })
  }

  ngOnInit() {
  }

  getEat(id){
    let observable = this._httpService.getEat(id)
    observable.subscribe(data=>{
    this.eats = data['data']
    console.log("got too get eat function",data)
    })
  }

  showReviews(id){
    this._router.navigate(['/review/'+id])
  }
  
  
  addReview(id){
    let observable = this._httpService.addReview(id, this.newReview)
    observable.subscribe(data=>{
      if(data['error']){
        this.error = "These field cannot be left blank"
      
      }
      else{
        this.showReviews(id);
      }
    })
  }
}