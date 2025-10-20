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

addToWatchlist(userId: string, movieId: string): Observable<any> {
  const token = localStorage.getItem('token'); // or wherever you store it
  return this.http.post(
    `https://filmy-dusky.vercel.app/api/users/${userId}/watchlist/${movieId}`,
    {}, // empty body, since backend uses params
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}
}
