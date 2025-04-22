import p5 from 'p5';
import { ICreature } from './icreature';
import { Sketch } from '../../../../models';

export interface ISpawner {
    s: Sketch;
    position: p5.Vector;

    spawn(): ICreature;
}