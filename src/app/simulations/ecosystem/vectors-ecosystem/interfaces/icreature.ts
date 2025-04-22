import p5 from 'p5';
import { Theme } from '../../../../models';

export interface ICreature {
    s: p5;
    t: Theme;
    position: p5.Vector;
    width: number;
    height: number;

    render(): void;
    update(): void;
}