import { SimulationPattern } from '../../models';
import { CreatingForces, FluidResistance, ForcesOnTwoObjects, Friction, FrictionWithTwoObjects, GravityScaledMass, HeliumBalloons, MagneticMouse, RepellingForces, VariableWindForce } from '../../simulations';

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
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/forces/creating-forces.ts',
        'Click / Tap to generate wind force'
    ),
    new SimulationPattern(
        'Forces Acting on Two Objects',
        'forces-on-two-objects',
        2,
        (element: HTMLElement) => new ForcesOnTwoObjects(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/forces/forces-on-two-objects.ts',
        'Click / Tap to generate wind force'
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
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/forces/variable-wind-force.ts',
        'Click / Tap to generate wind force'
    ),
    new SimulationPattern(
        'Gravity Scaled by Mass',
        'gravity-scaled-mass',
        5,
        (element: HTMLElement) => new GravityScaledMass(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/forces/gravity-scaled-mass.ts',
        'Click / Tap to generate wind force'
    ),
    new SimulationPattern(
        'Friction',
        'friction',
        6,
        (element: HTMLElement) => new Friction(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/forces/friction.ts',
        'Click / Tap to generate wind force'
    ),
    new SimulationPattern(
        'Friction With Two Objects',
        'friction-with-two-objects',
        7,
        (element: HTMLElement) => new FrictionWithTwoObjects(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/forces/friction-with-two-objects.ts',
        'Click / Tap to generate wind force'
    ),
    new SimulationPattern(
        'Magnetic Mouse',
        'magnetic-mouse',
        8,
        (element: HTMLElement) => new MagneticMouse(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/forces/magnetic-mouse.ts',
        'Click / Tap to attract the ball to the mouse'
    ),
    new SimulationPattern(
        'Fluid Resistance',
        'fluid-resistance',
        9,
        (element: HTMLElement) => new FluidResistance(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/forces/fluid-resistance/index.ts'
    )
]