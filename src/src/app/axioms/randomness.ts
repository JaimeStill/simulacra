import { TraditionalRandomWalk } from '../simulations';
import { Axiom } from './axiom';

export class Randomness extends Axiom {
    constructor(element: HTMLElement) {
        super(
            'Randomness',
            'randomness',
            0,
            [
                new TraditionalRandomWalk(element)
            ]
        );
    }
}