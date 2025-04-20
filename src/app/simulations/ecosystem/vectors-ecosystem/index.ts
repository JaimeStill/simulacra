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

    protected sketch(s: p5): void {
        const background: Background = new Background(
            s,
            this.theme,
            this.width,
            this.height
        );

        const maxProtospores = 6;
        const spawners: ProtosporeSpawner[] = [];

        let protospores: Protospore[] = [];
        let neurozoids: Neurozoid[] = [];

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.colorMode(s.HSL);
            initializeSpawners();
        }

        s.draw = () => {
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
            })
        }

        const initializeSpawners = (): void => {
            const spawnerCount: number = s.floor(s.random(3, 7));

            for (let i = 0; i <= spawnerCount; i++)
                spawners[i] = new ProtosporeSpawner(
                    s,
                    this.theme,
                    generateSpawnerPosition(),
                    this.width,
                    this.height
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