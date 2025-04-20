import p5 from 'p5';
import { ICreature, ISpawner } from '../interfaces';

export abstract class Spawner implements ISpawner {
    constructor(
        public s: p5,
        public position: p5.Vector
    ) { }

    abstract spawn(): ICreature;
}