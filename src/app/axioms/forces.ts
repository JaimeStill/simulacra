import { AxiomPattern } from '../models';
import { Axiom } from './axiom';
import { ForcesPatterns } from './patterns';

export class Forces extends Axiom {
    constructor() {
        super(
            new AxiomPattern(
                'Forces',
                'forces',
                2,
                ForcesPatterns,
                'https://natureofcode.com/forces/'
            )
        )
    }
}