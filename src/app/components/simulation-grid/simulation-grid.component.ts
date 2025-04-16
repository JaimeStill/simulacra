import { Component, input } from '@angular/core';
import { Axiom } from '../../axioms';
import { AxiomPanelComponent } from '../axiom-panel';

@Component({
    selector: 'simulation-grid',
    templateUrl: 'simulation-grid.component.html',
    styleUrl: 'simulation-grid.component.css',
    imports: [AxiomPanelComponent]
})
export class SimulationGridComponent {
    axioms = input.required<Axiom[]>();
}