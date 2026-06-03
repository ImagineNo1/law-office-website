import mongoose from "mongoose";

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

  const mongodbUri = process.env.MONGODB_URI;

  if (!mongodbUri) {
    throw new Error(
      "MONGODB_URI is not defined. Add it to .env.local or .env in the project root and restart the dev server.",
    );
  }

  cached.promise ??= mongoose.connect(mongodbUri, {
    bufferCommands: false,
  });

  cached.conn = await cached.promise;
  return cached.conn;
}
