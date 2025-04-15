import { SimulationPattern } from '../patterns';
import { TraditionalRandomWalk } from '../simulations';

export const RandomnessPatterns: SimulationPattern[] = [
    new SimulationPattern(
        'Traditional Random Walker',
        'traditional-random-walker',
        0,
        (element: HTMLElement) => new TraditionalRandomWalk(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/src/app/models/simulations/traditional-random-walk.ts'
    )
]