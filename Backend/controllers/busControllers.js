import redis from "../config/redis.js";

// ✅ Update bus location in Redis
const updateBusLocation = async (data) => {
  const { busId, latitude, longitude, timestamp } = data;
  const key = `bus:${busId}`;

  try {
    await redis.hset(key, {
      latitude,
      longitude,
      timestamp,
    });
    console.log(` Bus ${busId} updated in Redis`);
  } catch (err) {
    console.error(" Error updating bus in Redis:", err);
  }
};

// ✅ Get bus location from Redis
const getBusLocation = async (busId) => {
  const key = `bus:${busId}`;

  try {
    const busData = await redis.hgetall(key);

    if ( busData && Object.keys(busData).length > 0) {
      console.log(` Fetched bus ${busId} from Redis`);
      return busData;
    } else {
      console.log(` No data found for bus ${busId}`);
      return null;
    }
  } catch (err) {
    console.error(" Error getting bus from Redis:", err);
    return null;
  }
};

export { updateBusLocation, getBusLocation };
