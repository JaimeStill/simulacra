import p5 from 'p5';
import { Sketch } from '../../../models';

export class Terrain {
    columns: number;
    rows: number;
    z: number[][];
    zoff: number = 0;
    grid: p5.Color;

    constructor(
        public s: Sketch,
        public cellSize: number
    ) {
        this.grid = this.s.p5.color(140, 100, 16, 1);

        this.columns = s.p5.floor(this.s.width / this.cellSize);
        this.rows = s.p5.floor(this.s.height / this.cellSize);
        this.z = this.make2dArray(this.columns, this.rows);
    }

    calculate(xoff: number, yoff: number) {
        return this.s.p5.map(
            this.s.p5.noise(xoff, yoff, this.zoff),
            0, 1,
            -160, 160
        );
    }

    generate() {
        let xoff = 0;
        for (let i = 0; i < this.columns; i++) {
            let yoff = 0;
            for (let j = 0; j < this.rows; j++) {
                this.z[i][j] = this.calculate(xoff, yoff);
                yoff += 0.1;
            }
            xoff += 0.1;
        }
        this.zoff += 0.01;
    }

    make2dArray(columns: number, rows: number): Array<Array<number>> {
        const base = new Array<Array<number>>(columns);
        for (let i = 0; i < base.length; i++)
            base[i] = new Array<number>(rows);
        return base;
    }

    render() {
        for (let x = 0; x < this.z.length - 1; x++) {
            this.s.p5.beginShape(this.s.p5.QUAD_STRIP);

            for (let y = 0; y < this.z[x].length; y++) {
                this.s.p5.stroke(this.grid);

                this.s.p5.fill(
                    this.shade(this.z[x][y])
                );

                const vx = x * this.cellSize - this.s.width / 2;
                const vy = y * this.cellSize - this.s.height / 2;

                this.s.p5.vertex(vx, vy, this.z[x][y]);
                this.s.p5.vertex(vx + this.cellSize, vy, this.z[x+1][y]);
            }

            this.s.p5.endShape();
        }
    }

    shade(elevation: number): p5.Color {
        return this.s.p5.color(
            140,
            100,
            this.s.p5.map(elevation, -160, 160, 10, 90),
            .8
        );
    }
}