import {displayTrains, updateFlash, switchEtat} from './arrivees-departs.js';

await updateFlash();
await displayTrains("departs");
switchEtat();