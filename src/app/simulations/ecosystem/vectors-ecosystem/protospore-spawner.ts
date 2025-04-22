import p5 from 'p5';
import { ISpawner } from './interfaces';
import { Protospore } from './protospore';
import { Sketch } from '../../../models';

export class ProtosporeSpawner implements ISpawner {
    canSpawn: boolean = true;
    ticks: number = 0;    
    idle: number = 0;

    constructor(
        public s: Sketch,
        public position: p5.Vector
    ) {
        this.setIdle();
        s.p5.millis()
    }

    spawn(): Protospore {
        this.canSpawn = false;
        this.ticks = 0;
        this.setIdle();

        return new Protospore(
            this.s,
            this.position.copy()
        );
    }
    
    tick(): void {
        this.ticks++;
        if (this.ticks >= this.idle)
            this.canSpawn = true;
    }

    private setIdle() {
        this.idle = this.s.p5.floor(
            this.s.p5.random(220, 800)
        );
    }
}