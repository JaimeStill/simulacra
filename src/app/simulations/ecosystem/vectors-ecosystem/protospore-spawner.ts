import p5 from 'p5';
import { ISpawner } from './interfaces';
import { Protospore } from './protospore';
import { Theme } from '../../../models';

export class ProtosporeSpawner implements ISpawner {
    canSpawn: boolean = true;
    ticks: number = 0;    
    idle: number = 0;

    constructor(
        public s: p5,
        public t: Theme,
        public position: p5.Vector,
        public width: number,
        public height: number
    ) {
        this.setIdle();
        s.millis()
    }

    spawn(): Protospore {
        this.canSpawn = false;
        this.ticks = 0;
        this.setIdle();

        return new Protospore(
            this.s,
            this.t,
            this.position.copy(),
            this.width,
            this.height
        );
    }
    
    tick(): void {
        this.ticks++;
        if (this.ticks >= this.idle)
            this.canSpawn = true;
    }

    private setIdle() {
        this.idle = this.s.floor(
            this.s.random(220, 800)
        );
    }
}