import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Movie {
  title: string;
  year: number;
  poster?: string;
  type?: string; 
}

interface User {
  name: string;
  email: string;
  avatar?: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  user: User | null = null;
  favorites: Movie[] = [];
  watchlist: Movie[] = [];

  ngOnInit(): void {

    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      this.user = {
        name: 'Guest User',
        email: 'guest@example.com',
        avatar: 'https://i.pravatar.cc/150?img=12'
      };
    }

    const favData = localStorage.getItem('favorites');
    if (favData) {
      this.favorites = JSON.parse(favData);
    }

    const watchlistData = localStorage.getItem('watchlist');
    if (watchlistData) {
      this.watchlist = JSON.parse(watchlistData);
    }
  }

  removeFavorite(index: number): void {
    this.favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  removeWatchlist(index: number): void {
    this.watchlist.splice(index, 1);
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }
}