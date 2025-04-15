import { Component, computed, ElementRef, input, viewChild } from '@angular/core';
import { SimulationPattern } from '../../models';

@Component({
    selector: 'simulation',
    templateUrl: 'simulation.component.html'
})
export class SimulationComponent {
    renderer = viewChild.required<ElementRef<HTMLDivElement>>('renderer');
    pattern = input.required<SimulationPattern>();
    simulation = computed(() => this.pattern().build(this.renderer().nativeElement));
}