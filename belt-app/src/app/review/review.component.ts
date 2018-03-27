import { Component, OnInit } from '@angular/core';
import { HttpService} from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  review: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this._route.params.subscribe((params: Params)=>{
      this.getReviews(params['id'])
    })
   }
   ngOnInit() {
  }
  getReviews(id){
    this._httpService.getEat(id).subscribe(data=>{
      this.review = data['data']
      console.log("getting reviews in componenet", data)
    })
  }
  writeReview(id){
    console.log("i can create review")
    this._router.navigate(['/write/'+id])
  }
  getHome(){
    this._router.navigate(['/home'])
  }
  voteStar(id, idx, delta){
    this._httpService.voteStar(id, idx, delta).subscribe(data=>{
      this.getReviews(id)
    })
  }
 
}

