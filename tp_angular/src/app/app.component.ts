import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Book } from './shared/Book.model'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tp_angular'
  books: Book[] = [
    'La boite a merveilles',
    'Les miserables',
    'Le chat botte',
  ].map((b, id) => ({ id, name: b, isRead: id % 2 != 0 }))
}
