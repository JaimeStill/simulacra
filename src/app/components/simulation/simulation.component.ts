import { Component, computed, effect, ElementRef, input, OnDestroy, viewChild } from '@angular/core';
import { SimulationPattern } from '../../models';

@Component({
    selector: 'simulation',
    templateUrl: 'simulation.component.html',
    styleUrl: 'simulation.component.css'
})
export class SimulationComponent implements OnDestroy {
    pattern = input.required<SimulationPattern>();
    renderer = viewChild.required<ElementRef<HTMLDivElement>>('renderer');

    simulation = computed(() =>
        this.pattern().build(this.renderer().nativeElement)
    );

    constructor() {
        effect(() => {
            this.simulation().start();
        });
    }

    ngOnDestroy(): void {
        this.simulation().destroy();
    }
}