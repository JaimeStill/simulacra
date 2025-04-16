import { Pattern } from './pattern';
import { SimulationPattern } from './simulation-pattern';

export class AxiomPattern extends Pattern {
    constructor(
        name: string,
        url: string,
        index: number,
        public simulations: SimulationPattern[],
        reference?: string
    ) {
        super(name, url, index, reference);
    }

    find(url: string) {
        return this.simulations.find((s) => s.url === url)
    }
}