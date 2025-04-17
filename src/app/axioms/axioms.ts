import { Axiom } from './axiom';
import { Ecosystem } from './ecosystem';
import { Randomness } from './randomness';

export const Axioms: Axiom[] = [
    new Randomness(),
    new Ecosystem()
]
.sort((a, b) => a.pattern.index - b.pattern.index);