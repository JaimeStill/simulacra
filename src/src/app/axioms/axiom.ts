import { Simulation } from '../simulations';

export abstract class Axiom {
    constructor(
        public name: string,
        public url: string,
        public index: number,
        public simulations: Simulation[]
    ) {
        this.simulations.sort((a, b) => a.index - b.index);
    }
}