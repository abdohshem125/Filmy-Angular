import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private http = inject(HttpClient);
  private apiUrl = 'https://filmy-dusky.vercel.app/api/movies';

  getAllMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
  getMovieById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addToWatchlist(movieId: string): Observable<any> {
    return this.http.post(`  private apiUrl = 'https://filmy-dusky.vercel.app/api/watchlist`, { movieId });
  }
}
