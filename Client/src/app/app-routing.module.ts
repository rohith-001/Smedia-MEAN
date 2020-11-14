import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { FollowerPostComponent } from './follower-post/follower-post.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {ResetpasswordNewpasswordComponent} from './resetpassword-newpassword/resetpassword-newpassword.component'
import {ResetpasswordEmailComponent} from './resetpassword-email/resetpassword-email.component'
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'search', component: SearchComponent },
  { path: 'home', component: HomeComponent },
  { path: 'followerPost', component: FollowerPostComponent },
  { path: 'createPost', component: CreatePostComponent },
  { path: 'profile',  component: UserProfileComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'reset',  component: ResetpasswordEmailComponent },
  { path: 'reset/:id', component: ResetpasswordNewpasswordComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
