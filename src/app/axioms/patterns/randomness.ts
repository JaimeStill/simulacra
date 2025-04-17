import { SimulationPattern } from '../../models';
import { AcceptRejectDistribution, GaussianDistribution, GuassianRandomWalk, PaintSplatter, RandomNumberDistribution, SkewedRandomWalk, TraditionalRandomWalk } from '../../simulations';

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
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/randomness/random-number-distribution.ts'
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
        'Paint Splatter',
        'paint-splatter',
        4,
        (element: HTMLElement) => new PaintSplatter(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/randomness/paint-splatter.ts'
    ),
    new SimulationPattern(
        'Gaussian Random Walker',
        'gaussian-random-walker',
        5,
        (element: HTMLElement) => new GuassianRandomWalk(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/randomness/gaussian-random-walk.ts'
    ),
    new SimulationPattern(
        'Accept Reject Distribution',
        'accept-reject-distribution',
        6,
        (element: HTMLElement) => new AcceptRejectDistribution(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/randomness/accept-reject-distribution.ts'
    ),
]