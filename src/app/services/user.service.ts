import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private favoritesSubject = new BehaviorSubject<any[]>(this.getFavoritesFromStorage());
  favorites$ = this.favoritesSubject.asObservable();

  private watchlistSubject = new BehaviorSubject<any[]>(this.getWatchlistFromStorage());
  watchlist$ = this.watchlistSubject.asObservable();

  getFavoritesFromStorage() {
    const f = localStorage.getItem('favorites');
    return f ? JSON.parse(f) : [];
  }

  getWatchlistFromStorage() {
    const w = localStorage.getItem('watchlist');
    return w ? JSON.parse(w) : [];
  }

  updateFavorites(favorites: any[]) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
  }

  updateWatchlist(watchlist: any[]) {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    this.watchlistSubject.next(watchlist);
  }
}
