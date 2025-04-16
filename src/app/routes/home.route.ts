import { Component, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { ParamState, SimulationPattern } from '../models';
import { AppPanelComponent, SimulationComponent, SimulationGridComponent } from '../components';
import { AppService } from '../services';

@Component({
    selector: 'home-route',
    templateUrl: 'home.route.html',
    styleUrl: 'home.route.css',
    imports: [
        AppPanelComponent,
        SimulationComponent,
        SimulationGridComponent
    ]
})
export class HomeRoute {
    app = inject(AppService);
    renderer = viewChild.required<ElementRef<HTMLDivElement>>('renderer');

    navigate(state?: ParamState | undefined) {
        this.app.load(state);
    }
}