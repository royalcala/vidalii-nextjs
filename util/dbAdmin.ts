import mongoose from 'mongoose'
import Path from 'path'
const modelsPaths = require.context(
  '../models/admin',
  true,
  /\.(ts)$/
  // (mode = 'sync')
);
const Schemas = modelsPaths.keys().map(dir => {
  return modelsPaths(dir).Schema
})

class Db {
  private conn = new Map<number, mongoose.Connection>()
  constructor() { }
  private getConn(seq: number, uri: string) {
    if (this.conn.get(seq)?.readyState && this.conn.get(seq)?.readyState === 1) {
      return this.conn.get(seq)
    }
    else
      return this.createConn(seq, uri)
  }

  private async createConn(seq: number, uri: string) {
    const conn = await mongoose.createConnection(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    const paths = modelsPaths.keys()
    for (let index = 0; index < Schemas.length; index++) {
      const path = paths[index]
      const schema = Schemas[index]
      const extension = Path.extname(path)
      const fileName = Path.basename(path, extension)
      await conn.model(fileName, schema);
    }
    this.conn.set(seq, conn)
    return this.conn.get(seq)
  }

  async getModel(name: string, { seq, uri }: { seq: number, uri: string }) {

    const conn = await this.getConn(seq, uri)

    return conn?.models[name] as mongoose.Model<any>
  }

}

export default new Db()

// const MONGODB_URI = process.env.MONGODB_URI

// if (!MONGODB_URI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   )
// }

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
//@ts-ignore
// let cached = global.mongoose

// if (!cached) {
//   //@ts-ignore
//   cached = global.mongoose = { conn: null, promise: null }
// }
// const cached: { conn, promise }[] = []

// async function dbConnect(company_seq: number = 1) {
//   if (cached?.[company_seq]) {
//     return cached[company_seq].conn
//   }

//   if (!cached?.[company_seq]?.promise) {
//     cached[company_seq] = {
//       conn: null,
//       promise: null
//     }
//     const opts = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       bufferCommands: false,
//       bufferMaxEntries: 0,
//       useFindAndModify: false,
//       useCreateIndex: true,
//       autoIndex: false //TODO create all the indexes with vidaliiManager
//     }
//     //@ts-ignore
//     cached[company_seq].promise = await mongoose.connect(MONGODB_URI, opts)
//     // .then((mongoose) => {
//     //   return mongoose
//     // })
//   }
//   cached[company_seq].conn = cached[company_seq].promise
//   return cached[company_seq].conn
// }

// export default dbConnect
