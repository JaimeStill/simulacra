import { AxiomPattern } from '../models';

export abstract class Axiom {
    constructor(
        public pattern: AxiomPattern
    ) {
        pattern.simulations.sort((a, b) => a.index - b.index);
    }
}