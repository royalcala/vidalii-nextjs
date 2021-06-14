import mongoose from 'mongoose'
import Path from 'path'
// import dynamic from 'next/dynamic'
// const DynamicComponent = dynamic(() => import('../models/manager/companies'))
const MONGODB_URI = process.env.MONGODB_URI_MANAGER

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
//@ts-ignore
let cached = global.mongoose

if (!cached) {
  //@ts-ignore
  cached = global.mongoose = { conn: null, models: null }
}

const modelsPaths = require.context(
  '../models/manager',
  true,
  /\.(ts)$/
  // (mode = 'sync')
);
const Schemas = modelsPaths.keys().map(dir => {
  if (modelsPaths(dir)?.Schema)
    return modelsPaths(dir).Schema
  else {
    console.warn('Doesnt has export Schema:', dir)
    return null
  }
}).filter(v => v !== null)
async function dbConnect(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn
  }

  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    bufferMaxEntries: 0,
    useFindAndModify: false,
    useCreateIndex: true,
  }
  //@ts-ignore
  cached.conn = await mongoose.createConnection(MONGODB_URI, opts)
  const paths = modelsPaths.keys()
  for (let index = 0; index < Schemas.length; index++) {
    const path = paths[index]
    const schema = Schemas[index]
    // console.log(path)
    const extension = Path.extname(path)
    const fileName = Path.basename(path, extension)
    // console.log(fileName)
    await cached.conn.model(fileName, schema);
  }
  return cached.conn
}

export default dbConnect
