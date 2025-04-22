import p5 from 'p5';
import { Sketch } from '../../../models';

export type Orientation = 'top' | 'right' | 'bottom' | 'left';

export class Repellent {
    falloff: number;

    thickness: number = 2;
    scale: number = .0008;

    position: p5.Vector;

    constructor(
        public s: Sketch,
        public orientation: Orientation
    ) {
        this.position = this.calcPosition();

        this.falloff = this.isHorizontal()
            ? s.height / 3
            : s.width / 3;
    }

    render() {
        this.s.p5.push();

        this.s.p5.noFill();
        const hue = this.isHorizontal() ? 240 : 0;
        const count = this.falloff / this.thickness;

        for (let i = 0; i < count; i += this.thickness) {
            const alpha = this.s.p5.map(i, 0, count, 1, .1);

            this.s.p5.stroke(hue, 100, 60, alpha);
            this.s.p5.strokeWeight(this.thickness);

            switch (this.orientation) {
                case 'top':
                    this.s.p5.line(0, i, this.s.width, i);
                    break;
                case 'right':
                    this.s.p5.line(this.s.width - i, 0, this.s.width - i, this.s.height);
                    break;
                case 'bottom':
                    this.s.p5.line(0, this.s.height - i, this.s.width, this.s.height - i);
                    break;
                case 'left':
                    this.s.p5.line(i, 0, i, this.s.height);
                    break;
            }
        }

        this.s.p5.pop();
    }

    repel(object: p5.Vector): p5.Vector {
        const pos = object.copy();
        const distance = this.calcDistance(pos);
        const magnitude = this.magnitude(distance);

        const force = this.isHorizontal()
            ? this.s.p5.createVector(0, magnitude)
            : this.s.p5.createVector(magnitude, 0);

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
                return this.s.p5.createVector(this.s.width / 2, 0);
            case 'right':
                return this.s.p5.createVector(this.s.width, this.s.height / 2);
            case 'bottom':
                return this.s.p5.createVector(this.s.width / 2, this.s.height);
            default:
                return this.s.p5.createVector(0, this.s.height / 2);
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

        let mag = this.s.p5.map(
            distance,
            0, this.falloff,
            this.falloff * this.scale, 0
        );

        return this.isNegative()
            ? mag * -1
            : mag;
    }
}