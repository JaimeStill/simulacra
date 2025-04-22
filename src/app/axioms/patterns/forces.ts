import { SimulationPattern } from '../../models';
import { HeliumBalloons } from '../../simulations';

export const ForcesPatterns: SimulationPattern[] = [
    new SimulationPattern(
        'Helium Balloons',
        'helium-balloons',
        0,
        (element: HTMLElement) => new HeliumBalloons(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/forces/helium-balloons.ts'
    )    
]