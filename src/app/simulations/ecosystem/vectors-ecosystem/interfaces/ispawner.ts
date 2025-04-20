import p5 from 'p5';
import { ICreature } from './icreature';

export interface ISpawner {
    s: p5;
    position: p5.Vector;
    spawn(): ICreature;
}