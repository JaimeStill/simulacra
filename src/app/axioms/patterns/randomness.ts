import { SimulationPattern } from '../../models';
import { AcceptRejectDistribution, GaussianDistribution, RandomNumberDistribution, SkewedRandomWalk, TraditionalRandomWalk } from '../../simulations';

export const RandomnessPatterns: SimulationPattern[] = [
    new SimulationPattern(
        'Traditional Random Walker',
        'traditional-random-walker',
        0,
        (element: HTMLElement) => new TraditionalRandomWalk(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/randomness/traditional-random-walk.ts'
    ),
    new SimulationPattern(
        'Random Number Distribution',
        'random-number-distribution',
        1,
        (element: HTMLElement) => new RandomNumberDistribution(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simluations/randomness/random-number-distribution.ts'
    ),
    new SimulationPattern(
        'Skewed Random Walker',
        'skewed-random-walker',
        2,
        (element: HTMLElement) => new SkewedRandomWalk(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/randomness/skewed-random-walk.ts'
    ),
    new SimulationPattern(
        'Gaussian Distribution',
        'gaussian-distribution',
        3,
        (element: HTMLElement) => new GaussianDistribution(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/randomness/gaussian-distribution.ts'
    ),
    new SimulationPattern(
        'Accept Reject Distribution',
        'accept-reject-distribution',
        4,
        (element: HTMLElement) => new AcceptRejectDistribution(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/randomness/accept-reject-distribution.ts'
    )
]