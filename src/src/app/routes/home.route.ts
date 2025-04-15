import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { ParamState, Randomness } from '../models';
import { AppPanelComponent } from '../components';
import { AppService } from '../services';

@Component({
    selector: 'home-route',
    templateUrl: 'home.route.html',
    styleUrl: 'home.route.css',
    imports: [
        AppPanelComponent
    ]
})
export class HomeRoute implements OnInit {
    app = inject(AppService);
    renderer = viewChild.required<ElementRef<HTMLDivElement>>('renderer');

    ngOnInit() {
        const randomness = new Randomness();
        randomness.pattern.simulations[0].build(this.renderer().nativeElement).start();
    }

    navigate(state?: ParamState | undefined) {
        this.app.load(state);                
    }
}