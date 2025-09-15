// this is for indexed db


import React, { useState, useEffect } from 'react';
import { db } from '../../libb/db'; // Import your Dexie instance

function TrackingMap() {
  const [busLocations, setBusLocations] = useState([]);
  const [status, setStatus] = useState('online');

  useEffect(() => {
    const syncData = async () => {
      try {
        // --- ONLINE PATH ---
        const response = await fetch('http://localhost:3001/api/buses/live');
        if (!response.ok) throw new Error('Network response was not ok.');
        
        const liveData = await response.json();
        
        setBusLocations(liveData);
        setStatus('online');
        
        
        await db.busLocations.bulkPut(liveData);

      } catch (error) {
        // --- OFFLINE PATH ---
        console.warn('Network failed. Loading from offline cache.');
        setStatus('offline');
        
        
        const offlineData = await db.busLocations.toArray();
        setBusLocations(offlineData);
      }
    };

    syncData(); // Run once on component load
    const intervalId = setInterval(syncData, 10000); // Sync every 10 seconds
    return () => clearInterval(intervalId); // Cleanup

  }, []);

  return (
    <div>
      <h1>Bus Tracker</h1>
      <p>Status: {status}</p>
      {/* You would render your actual map and bus markers here */}
      <ul>
        {busLocations.map(bus => (
          <li key={bus.busId}>
            {bus.busId}: Lat {bus.lat}, Lon {bus.lon}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrackingMap;