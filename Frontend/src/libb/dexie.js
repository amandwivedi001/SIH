// handles the offline db

import Dexie from 'dexie';

export const db = new Dexie('busTrackerDB');

db.version(1).stores({
    busLocations: 'busID',
})