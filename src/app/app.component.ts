import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './services';

@Component({
  selector: '[app-root]',
  templateUrl: 'app.component.html',
  imports: [RouterOutlet],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  private host = inject(ElementRef);
  app = inject(AppService);

  ngOnInit(): void {
    this.app.body.set(this.host);
  }
}
