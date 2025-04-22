import p5 from 'p5';
import { Simulation } from '../../simulation';
import { Background } from './background';
import { ProtosporeSpawner } from './protospore-spawner';
import { Protospore } from './protospore';
import { Neurozoid } from './neurozoid';

export class VectorsEcosystem extends Simulation {    
    constructor(element: HTMLElement) {
        super(element);
    }

    protected run(s: p5): void {
        const background: Background = new Background(this.sketch(s));
        const maxProtospores = 18;
        const spawners: ProtosporeSpawner[] = [];

        let protospores: Protospore[] = [];
        let neurozoids: Neurozoid[] = [];

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.colorMode(s.HSL);
            initializeSpawners();
        }

        s.draw = () => {
            s.clear();
            background.render();

            spawners.forEach(s => {
                s.tick();

                if (!(protospores.length >= maxProtospores))
                    if (s.canSpawn)
                        protospores.push(s.spawn());
            });

            protospores.forEach(p => {
                p.update();

                if (p.hatched)
                    neurozoids.push(p.spawn());

                p.render();
            });

            protospores = protospores.filter(p => !p.hatched);
            
            neurozoids.forEach(n => {
                n.update();
                n.render();
            });

            neurozoids = neurozoids.filter(n => !n.dead);
        }

        const initializeSpawners = (): void => {
            for (let i = 0; i <= 12; i++)
                spawners[i] = new ProtosporeSpawner(
                    this.sketch(s),
                    generateSpawnerPosition()
                );
        }

        const generateSpawnerPosition = (): p5.Vector => {
            const std = 120;
            const x = s.randomGaussian(this.width / 2, std);
            const y = s.randomGaussian(this.height / 2, std);

            return s.createVector(x, y);
        }
    }
}