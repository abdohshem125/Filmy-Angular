import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Movies } from './components/movies/movies';
import { MovieDetails } from './components/movie-details/movie-details';
import { Profile } from './components/profile/profile';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { ContactUs } from './components/contact-us/contact-us';
import { AboutUs } from './components/about-us/about-us';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'movies', component: Movies },
  { path: 'movieDetails', component: MovieDetails },
  { path: 'profile', component: Profile },
  { path: 'contactUs', component: ContactUs },
  { path: 'aboutUs', component: AboutUs },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
];
