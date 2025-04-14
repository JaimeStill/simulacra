import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { Randomness } from '../axioms';

@Component({
    selector: 'home-route',
    templateUrl: 'home.route.html',
    styleUrl: 'home.route.css'
})
export class HomeRoute implements OnInit {
    renderer = viewChild.required<ElementRef<HTMLDivElement>>('renderer');

    ngOnInit() {
        const randomness = new Randomness(
            this.renderer().nativeElement
        );

        randomness.simulations[0].start();
    }
}