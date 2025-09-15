import Redis from "ioredis";

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";

const redis = new Redis({
  port: REDIS_PORT,
  host: REDIS_HOST,
});

redis.on("connect", () => {
  console.log(` Connected to Redis at ${REDIS_HOST}:${REDIS_PORT}`);
});

redis.on("error", (err) => {
  console.error(" Redis connection error:", err);
});

export default redis;
