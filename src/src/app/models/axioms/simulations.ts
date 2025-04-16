import { SimulationPattern } from '../patterns';
import { SkewedRandomWalk, TraditionalRandomWalk } from '../simulations';

export const RandomnessPatterns: SimulationPattern[] = [
    new SimulationPattern(
        'Traditional Random Walker',
        'traditional-random-walker',
        0,
        (element: HTMLElement) => new TraditionalRandomWalk(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/src/app/models/simulations/randomness/traditional-random-walk.ts'
    ),
    new SimulationPattern(
        'Skewed Random Walker',
        'skewed-random-walker',
        1,
        (element: HTMLElement) => new SkewedRandomWalk(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/src/app/models/simulations/randomness/skewed-random-walk.ts'
    )
]