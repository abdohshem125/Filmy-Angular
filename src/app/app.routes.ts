import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Movies } from './components/movies/movies';
import { MovieDetails } from './components/movie-details/movie-details';
import { Profile } from './components/profile/profile';
// import { ContactUs } from './components/contact-us/contact-us';
// import { AboutUs } from './components/about-us/about-us';
import { ContactUsComponent } from './components/contact-us/contact-us';
import { AboutUsComponent } from './components/about-us/about-us';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'movies', component: Movies },
  { path: 'movies/:genre', component: Movies },
  { path: 'movieDetails/:id', component: MovieDetails },
  { path: 'profile', component: Profile },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
];
