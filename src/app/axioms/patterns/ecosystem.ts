import { SimulationPattern } from '../../models';
import { RandomnessEcosystem, VectorsEcosystem } from '../../simulations';

export const EcosystemPatterns: SimulationPattern[] = [
    new SimulationPattern(
        'Part 1: Randomness',
        'eco-randomness',
        0,
        (element: HTMLElement) => new RandomnessEcosystem(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/ecosystem/randomness-ecosystem/index.ts'
    ),
    new SimulationPattern(
        'Part 2: Vectors',
        'eco-vectors',
        1,
        (element: HTMLElement) => new VectorsEcosystem(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/ecosystems/vectors-ecosystem/index.ts'
    )
];