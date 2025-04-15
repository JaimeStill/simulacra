import { ElementRef, Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    body = signal<ElementRef<HTMLBodyElement> | null>(null);
}