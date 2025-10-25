import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './contact-us.html', 
})
export class ContactUsComponent {}