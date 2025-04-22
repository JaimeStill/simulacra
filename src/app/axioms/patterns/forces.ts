import { SimulationPattern } from '../../models';
import { CreatingForces, ForcesOnTwoObjects, HeliumBalloons, RepellingForces, VariableWindForce } from '../../simulations';

export const ForcesPatterns: SimulationPattern[] = [
    new SimulationPattern(
        'Helium Balloons',
        'helium-balloons',
        0,
        (element: HTMLElement) => new HeliumBalloons(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/forces/helium-balloons.ts'
    ),
    new SimulationPattern(
        'Creating Forces',
        'creating-forces',
        1,
        (element: HTMLElement) => new CreatingForces(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/forces/creating-forces.ts'
    ),
    new SimulationPattern(
        'Forces Acting on Two Objects',
        'forces-on-two-objects',
        2,
        (element: HTMLElement) => new ForcesOnTwoObjects(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/forces/forces-on-two-objects.ts'
    ),
    new SimulationPattern(
        'Repelling Forces',
        'repelling-forces',
        3,
        (element: HTMLElement) => new RepellingForces(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/forces/repelling-forces/index.ts'
    ),
    new SimulationPattern(
        'Variable Wind Force',
        'variable-wind-force',
        4,
        (element: HTMLElement) => new VariableWindForce(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/forces/variable-wind-force.ts'
    )
]