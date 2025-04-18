import { SimulationPattern } from '../../models';
import { BouncingBall, BouncingBallNoVectors, VectorNoiseWalker } from '../../simulations';

export const VectorsPatterns: SimulationPattern[] = [
    new SimulationPattern(
        'Bouncing Ball with No Vectors',
        'bouncing-ball-no-vectors',
        0,
        (element: HTMLElement) => new BouncingBallNoVectors(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/vectors/bouncing-ball-no-vectors.ts'
    ),
    new SimulationPattern(
        'Bouncing Ball',
        'bouncing-ball',
        1,
        (element: HTMLElement) => new BouncingBall(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/vectors/bouncing-ball.ts'
    ),
    new SimulationPattern(
        'Vector Noise Walker',
        'vector-noise-walker',
        2,
        (element: HTMLElement) => new VectorNoiseWalker(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/vectors/vector-noise-walker.ts'
    )
]