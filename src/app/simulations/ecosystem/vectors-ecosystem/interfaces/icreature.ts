import p5 from 'p5';
import { Sketch } from '../../../../models';

export interface ICreature {
    s: Sketch;
    position: p5.Vector;

    render(): void;
    update(): void;
}