import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

interface Greeting {
  message: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  greeting$!: Observable<Greeting>;

  ngOnInit() {
    this.greeting$ = this.http.get<Greeting>('/api/greeting');
  }
}
