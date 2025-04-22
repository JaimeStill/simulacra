import { Axiom } from './axiom';
import { Ecosystem } from './ecosystem';
import { Forces } from './forces';
import { Randomness } from './randomness';
import { Vectors } from './vectors';

export const Axioms: Axiom[] = [
    new Randomness(),
    new Vectors(),
    new Forces(),
    new Ecosystem()
]
.sort((a, b) => a.pattern.index - b.pattern.index);