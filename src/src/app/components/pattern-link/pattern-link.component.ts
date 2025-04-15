import { Component, input, output } from '@angular/core';
import { SimulationPattern } from '../../models';

@Component({
    selector: 'pattern-link',
    templateUrl: 'pattern-link.component.html',
    styleUrl: 'pattern-link.component.css'
})
export class PatternLinkComponent {
    pattern = input.required<SimulationPattern>();
    select = output<SimulationPattern>();
}