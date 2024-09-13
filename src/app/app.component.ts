import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterOutlet} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, NgForOf, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  books: Array<{ title: string, author: string, date: number }> = [];
  maxDate: string;

  bookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', [Validators.required]),
    date: new FormControl(null , [Validators.required])
  });
  constructor() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    this.maxDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }
  handleSubmit() {
    const formValue = this.bookForm.value;
    const newBook = {
      title: formValue.title ?? 'Unknown Title',
      author: formValue.author ?? 'Unknown Author',
      date: formValue.date ?? 0
    };
    this.books.push(newBook);
    this.bookForm.reset();
  }
}
