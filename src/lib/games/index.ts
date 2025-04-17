import type { Game } from '../types';
import { dungeon } from './dungeon';
import { monochrome } from './monochrome';
import { volcanic } from './volcanic';
import { grandhotel } from './grandhotel';
import { gloomcity } from './gloomcity';
import { nebelreich } from './nebelreich';
import { dimension } from './dimension';
import { azcana } from './azcana';
import { statue } from './statue';

export const games: Game[] = [
    dungeon,
    monochrome,
    volcanic,
    grandhotel,
    gloomcity,
    nebelreich,
    azcana,
    statue,
    dimension
];