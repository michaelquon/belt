import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { ReviewComponent } from './review/review.component';
import { EditComponent } from './edit/edit.component';
import { WriteComponent } from './write/write.component';
import { NewReviewComponent } from './new-review/new-review.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'new', component: NewComponent},
  {path: 'review/:id', component: ReviewComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'write/:id', component: WriteComponent},
  {path: 'newReview', component: NewReviewComponent},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
