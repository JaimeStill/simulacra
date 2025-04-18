import { SimulationPattern } from '../../models';
import { BouncingBallNoVectors } from '../../simulations';

export const VectorsPatterns: SimulationPattern[] = [
    new SimulationPattern(
        'Bouncing Ball with No Vectors',
        'bouncing-ball-no-vectors',
        0,
        (element: HTMLElement) => new BouncingBallNoVectors(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/vectors/bouncing-ball-no-vectors.ts'
    )
]