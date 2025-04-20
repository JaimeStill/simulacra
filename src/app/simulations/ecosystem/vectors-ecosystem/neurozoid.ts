import p5 from 'p5';
import { ICreature } from './interfaces';
import { Theme } from '../../../models';

export class Neurozoid implements ICreature {
    constructor(
        public s: p5,
        public t: Theme,
        public position: p5.Vector,
        public width: number,
        public height: number
    ) { }

    render(): void {        
    }

    update(): void {        
    }
}