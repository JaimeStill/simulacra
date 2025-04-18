import { SimulationPattern } from '../../models';
import { RandomnessEcosystem } from '../../simulations';

export const EcosystemPatterns: SimulationPattern[] = [
    new SimulationPattern(
        'Part 1: Randomness',
        'eco-randomness',
        0,
        (element: HTMLElement) => new RandomnessEcosystem(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/ecosystem/randomness-ecosystem/index.ts'
    )
];