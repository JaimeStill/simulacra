import { AxiomPattern } from '../models';
import { Axiom } from './axiom';
import { EcosystemPatterns } from './patterns';

export class Ecosystem extends Axiom {
    constructor() {
        super(
            new AxiomPattern(
                'Ecosystem',
                'ecosystem',
                1,
                EcosystemPatterns,
                'https://natureofcode.com/introduction/#the-ecosystem-project'
            )
        )
    }
}