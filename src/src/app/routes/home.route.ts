import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { Randomness } from '../models';

@Component({
    selector: 'home-route',
    templateUrl: 'home.route.html',
    styleUrl: 'home.route.css'
})
export class HomeRoute implements OnInit {
    renderer = viewChild.required<ElementRef<HTMLDivElement>>('renderer');

    ngOnInit() {
        const randomness = new Randomness();
        randomness.pattern.simulations[0].build(this.renderer().nativeElement).start();
    }
}