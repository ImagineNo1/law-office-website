import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

type CachedConnection = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseConnection: CachedConnection | undefined;
}

const cached: CachedConnection = globalThis.mongooseConnection ?? {
  conn: null,
  promise: null,
};

if (!globalThis.mongooseConnection) {
  globalThis.mongooseConnection = cached;
}

export async function connectDb() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined.");
  }

  cached.promise ??= mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  });

  cached.conn = await cached.promise;
  return cached.conn;
}
