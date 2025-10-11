import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5050/api/movies';

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  addToWatchlist(movieId: string): Observable<any> {
    return this.http.post(`http://localhost:5050/api/watchlist`, { movieId });
  }
}
