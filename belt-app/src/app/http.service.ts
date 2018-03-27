import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }
 
  getEats(){
    return this._http.get('/eats');
  }
  
  addEats(newEats){
    return this._http.post('/eats', newEats);
  }
  
  getEat(id){
    return this._http.get('/eats/'+id);
  }
  
  editEat(eat){
    return this._http.put('/eats/'+eat._id, eat);
  }

  deleteEat(id){
    return this._http.delete('/eats/'+id);
  }
 
  starEat(id,count){
    return this._http.put('/eats/stars/'+id, {count});
  }
  getReviews(id){
    return this._http.get('/eats/review/'+id)
  }
  addReview(id, newReview){
    console.log("I can add review from services")
    return this._http.put('/eats/reviews/'+id, newReview)
  }
  voteStar(id, idx, delta){
    var body = {'index': idx, 'change': delta}
    return this._http.put('/eats/stars/'+id, body)
  }
}
