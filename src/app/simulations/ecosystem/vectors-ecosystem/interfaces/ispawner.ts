import p5 from 'p5';
import { ICreature } from './icreature';
import { Theme } from '../../../../models';

export interface ISpawner {
    s: p5;
    t: Theme,
    position: p5.Vector;
    width: number;
    height: number;

    spawn(): ICreature;
}