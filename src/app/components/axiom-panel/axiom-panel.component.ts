import { Component, inject, input, model } from '@angular/core';
import { AppService } from '../../services';
import { SimulationPattern } from '../../models';
import { PatternLinkComponent } from '../pattern-link';
import { Axiom } from '../../axioms';

@Component({
    selector: 'axiom-panel',
    templateUrl: 'axiom-panel.component.html',
    styleUrl: 'axiom-panel.component.css',
    imports: [PatternLinkComponent]
})
export class AxiomPanelComponent {
    app = inject(AppService);
    axiom = input.required<Axiom>();
    expanded = model<boolean>(true);

    toggle() {
        this.expanded.set(!this.expanded());
    }

    load(pattern: SimulationPattern) {
        this.app.load({
            axiom: this.axiom().pattern.url,
            simulation: pattern.url
        });
    }
}