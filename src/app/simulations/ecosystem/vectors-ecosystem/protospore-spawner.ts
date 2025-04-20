import p5 from 'p5';
import { ISpawner } from './interfaces';
import { Protospore } from './protospore';
import { Theme } from '../../../models';

export class ProtosporeSpawner implements ISpawner {
    canSpawn: boolean = true;
    ticks: number = 0;    
    idle: number;

    constructor(
        public s: p5,
        public t: Theme,
        public position: p5.Vector,
        public width: number,
        public height: number
    ) {
        this.idle = s.floor(s.random(220, 800));
        s.millis()
    }
    
    tick(): void {
        this.ticks++;
        if (this.ticks >= this.idle)
            this.canSpawn = true;
    }

    spawn(): Protospore {
        this.canSpawn = false;
        this.ticks = 0;

        return new Protospore(
            this.s,
            this.t,
            this.position.copy(),
            this.width,
            this.height
        );
    }
}