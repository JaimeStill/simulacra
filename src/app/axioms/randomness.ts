import { Axiom } from './axiom';
import { AxiomPattern } from '../models';
import { RandomnessPatterns } from './simulations';

export class Randomness extends Axiom {
    constructor() {
        super(
            new AxiomPattern(
                'Randomness',
                'randomness',
                0,
                RandomnessPatterns,
                'https://natureofcode.com/random/'
            )
        )
    }
}