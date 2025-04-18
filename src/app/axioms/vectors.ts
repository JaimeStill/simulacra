import { AxiomPattern } from '../models';
import { Axiom } from './axiom';
import { VectorsPatterns } from './patterns';

export class Vectors extends Axiom {
    constructor() {
        super(
            new AxiomPattern(
                'Vectors',
                'vectors',
                1,
                VectorsPatterns,
                'https://natureofcode.com/vectors/'                
            )
        )
    }
}