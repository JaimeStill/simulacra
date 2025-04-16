import { SimulationPattern } from '../models';
import { SkewedRandomWalk, TraditionalRandomWalk } from '../simulations';

export const RandomnessPatterns: SimulationPattern[] = [
    new SimulationPattern(
        'Traditional Random Walker',
        'traditional-random-walker',
        0,
        (element: HTMLElement) => new TraditionalRandomWalk(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/randomness/traditional-random-walk.ts'
    ),
    new SimulationPattern(
        'Skewed Random Walker',
        'skewed-random-walker',
        1,
        (element: HTMLElement) => new SkewedRandomWalk(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/randomness/skewed-random-walk.ts'
    )
]