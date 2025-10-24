import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies implements OnInit {
  movies: any[] = [];
  allMovies: any[] = [];
  genre: string | null = null;

  searchTerm: string | null = null;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService

  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const g = params.get('genre');
      if (g) {
        this.genre = g;
        this.searchTerm = null; // reset search
        this.loadMovies();
      }
    });

    this.route.queryParamMap.subscribe((q) => {
      const s = q.get('search');
      if (s !== null) {
        this.searchTerm = s;
        this.genre = null; // reset genre
        this.loadMovies();
      }
    });

    if (!this.genre && !this.searchTerm) {
      this.loadMovies();
    }
  }

  loadMovies(): void {
    this.moviesService.getAllMovies().subscribe({
      next: (res: any) => {
        this.allMovies = res.movies ?? (Array.isArray(res) ? res : []);

        // ✅ Filter by genre first (if exists)
        let filtered = this.allMovies;
        if (this.genre) {
          const gLower = this.genre.toLowerCase();
          filtered = filtered.filter((m) => {
            if (!m.genre) return false;
            if (Array.isArray(m.genre)) {
              return m.genre.some((gg: string) => gg.toLowerCase() === gLower);
            }
            return m.genre.toString().toLowerCase() === gLower;
          });
        }

        // ✅ Then filter by search term (if exists)
        if (this.searchTerm) {
          const sLower = this.searchTerm.toLowerCase();
          filtered = filtered.filter((m) => m.title?.toLowerCase().includes(sLower));
        }

        this.movies = filtered;
      },
      error: (err) => console.error('Error fetching movies:', err),
    });
  }

toggleFavorite(movie: any, event: MouseEvent) {
  event.stopPropagation();

  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  if (!user || !token) { alert('Login required'); return; }

  const userId = JSON.parse(user)._id;

this.moviesService.addToFavorite(userId, movie._id).subscribe({
  next: () => {
    // Get current favorites from localStorage
    const favData = localStorage.getItem('favorites');
    let favorites: Movie[] = favData ? JSON.parse(favData) : [];

    const exists = favorites.find((f: Movie) => f._id === movie._id);

    if (exists) {
      // Remove from favorites
      favorites = favorites.filter(f => f._id !== movie._id);
      this.userService.updateFavorites(favorites); // update Profile
      movie.isFav = false;
    } else {
      // Add to favorites
      favorites.push(movie);
      this.userService.updateFavorites(favorites); // update Profile
      movie.isFav = true;
    }

    // Save updated favorites in localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
  },
  error: (err) => {
    console.error(err);
    alert('Failed to add favorite');
  }
});



// addToWatchlist(movieId: string) {
//   const userId = localStorage.getItem('userId');
//   const token = localStorage.getItem('token');

//   if (!userId || !token) {
//     alert("Please login first!");
//     return;
//   }

//   this.moviesService.addToWatchlist(userId, movieId).subscribe({
//     next: (res) => alert("✅ Added to watchlist!"),
//     error: (err) => alert("❌ Failed to add to watchlist"),
//   });
// }


  goToMovie(id: string) {
    this.router.navigate(['/movieDetails', id]);
  }
}
