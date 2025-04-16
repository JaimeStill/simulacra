import { Simulation } from '../../simulations';
import { Pattern } from './pattern';

export class SimulationPattern extends Pattern {
    constructor(
        name: string,
        url: string,
        index: number,
        public build: (element: HTMLElement) => Simulation,
        reference?: string
    ) {
        super(name, url, index, reference);
    }
}