import p5 from 'p5';
import { Theme } from '../../../models';

export type Orientation = 'top' | 'right' | 'bottom' | 'left';

export class Repellent {
    falloff: number;

    thickness: number = 2;
    scale: number = .0005;

    position: p5.Vector;

    constructor(
        public s: p5,
        public t: Theme,
        public orientation: Orientation,
        public cw: number,
        public ch: number,
    ) {
        this.position = this.calcPosition();

        this.falloff = this.isHorizontal()
            ? ch / 2.8
            : cw / 2.8;
    }

    render() {
        this.s.push();

        this.s.noFill();
        const hue = this.isHorizontal() ? 240 : 0;
        const count = this.falloff / this.thickness;

        for (let i = 0; i < count; i += this.thickness) {
            const alpha = this.s.map(i, 0, count, 1, .1);

            this.s.stroke(hue, 100, 60, alpha);
            this.s.strokeWeight(this.thickness);

            switch (this.orientation) {
                case 'top':
                    this.s.line(0, i, this.cw, i);
                    break;
                case 'right':
                    this.s.line(this.cw - i, 0, this.cw - i, this.ch);
                    break;
                case 'bottom':
                    this.s.line(0, this.ch - i, this.cw, this.ch - i);
                    break;
                case 'left':
                    this.s.line(i, 0, i, this.ch);
                    break;
            }
        }

        this.s.pop();
    }

    repel(object: p5.Vector): p5.Vector {
        const pos = object.copy();
        const distance = this.calcDistance(pos);
        const magnitude = this.magnitude(distance);

        const force = this.isHorizontal()
            ? this.s.createVector(0, magnitude)
            : this.s.createVector(magnitude, 0);

        return force;
    }

    private isNegative = () =>
        this.orientation === 'right'
        || this.orientation === 'bottom';

    private isHorizontal = () =>
        this.orientation === 'top'
        || this.orientation === 'bottom';

    private calcPosition(): p5.Vector {
        switch (this.orientation) {
            case 'top':
                return this.s.createVector(this.cw / 2, 0);
            case 'right':
                return this.s.createVector(this.cw, this.ch / 2);
            case 'bottom':
                return this.s.createVector(this.cw / 2, this.ch);
            default:
                return this.s.createVector(0, this.ch / 2);
        }
    }

    private calcDistance(pos: p5.Vector): number {
        return this.isHorizontal()
            ? pos.sub(pos.x, this.position.y).mag()
            : pos.sub(this.position.x, pos.y).mag();
    }

    private magnitude(distance: number): number {
        if (distance > this.falloff)
            return 0;

        let mag = this.s.map(
            distance,
            0, this.falloff,
            this.falloff * this.scale, 0
        );

        return this.isNegative()
            ? mag * -1
            : mag;
    }
}