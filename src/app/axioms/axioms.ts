import { Axiom } from './axiom';
import { Ecosystem } from './ecosystem';
import { Randomness } from './randomness';
import { Vectors } from './vectors';

export const Axioms: Axiom[] = [
    new Randomness(),
    new Vectors(),
    new Ecosystem()
]
.sort((a, b) => a.pattern.index - b.pattern.index);