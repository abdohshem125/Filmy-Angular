import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private favoritesSubject = new BehaviorSubject<any[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  private watchlistSubject = new BehaviorSubject<any[]>([]);
  watchlist$ = this.watchlistSubject.asObservable();

  private getUserId(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user)._id : null;
  }

  private getStorageKey(type: 'favorites' | 'watchlist') {
    const userId = this.getUserId();
    return userId ? `${type}_${userId}` : type;
  }

  getFavoritesFromStorage() {
    const key = this.getStorageKey('favorites');
    const f = localStorage.getItem(key);
    return f ? JSON.parse(f) : [];
  }

  getWatchlistFromStorage() {
    const key = this.getStorageKey('watchlist');
    const w = localStorage.getItem(key);
    return w ? JSON.parse(w) : [];
  }

  updateFavorites(favorites: any[]) {
    const key = this.getStorageKey('favorites');
    localStorage.setItem(key, JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
  }

  updateWatchlist(watchlist: any[]) {
    const key = this.getStorageKey('watchlist');
    localStorage.setItem(key, JSON.stringify(watchlist));
    this.watchlistSubject.next(watchlist);
  }
}
