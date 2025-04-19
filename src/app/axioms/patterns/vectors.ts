import { SimulationPattern } from '../../models';
import { BouncingBall, BouncingBallNoVectors, ConstantAcceleration, MotionVelocity, ThreeDBouncingBall, VectorMagnitude, VectorMultiplication, VectorNoiseMap, VectorNoiseWalker, VectorNormalization, VectorSubtraction } from '../../simulations';

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
    ),
    new SimulationPattern(
        'Vector Noise Map',
        'vector-noise-map',
        3,
        (element: HTMLElement) => new VectorNoiseMap(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/vectors/vector-noise-map.ts'
    ),
    new SimulationPattern(
        '3D Bouncing Ball',
        '3d-bouncing-ball',
        4,
        (element: HTMLElement) => new ThreeDBouncingBall(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/vectors/three-d-bouncing-ball/index.ts'
    ),
    new SimulationPattern(
        'Vector Subtraction',
        'vector-subtraction',
        5,
        (element: HTMLElement) => new VectorSubtraction(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/vectors/vector-subtraction.ts'
    ),
    new SimulationPattern(
        'Vector Multiplication',
        'vector-multiplication',
        6,
        (element: HTMLElement) => new VectorMultiplication(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/vectors/vector-multiplication.ts'
    ),
    new SimulationPattern(
        'Vector Magnitude',
        'vector-magnitude',
        7,
        (element: HTMLElement) => new VectorMagnitude(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/vectors/vector-magnitude.ts'
    ),
    new SimulationPattern(
        'Vector Normalization',
        'vector-normalization',
        8,
        (element: HTMLElement) => new VectorNormalization(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/vectors/vector-normalization.ts'
    ),
    new SimulationPattern(
        'Motion with Velocity',
        'motion-velocity',
        9,
        (element: HTMLElement) => new MotionVelocity(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/vectors/motion-velocity.ts'
    ),
    new SimulationPattern(
        'Constant Acceleration',
        'constant-acceleration',
        10,
        (element: HTMLElement) => new ConstantAcceleration(element),
        'https://github.com/JaimeStill/simulacra/blob/main/src/app/simulations/vectors/constant-acceleration.ts'
    )
]