import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { Options } from "@mikro-orm/core";
import { Companies } from "../entities/manager/Companies";

// const config: Options = {
//   dbName: "vidaliiManager",
//   type: "postgresql",
//   host: process.env.MANAGER_HOST,
//   port: Number(process.env.MANAGER_PORT),
//   user: process.env.MANAGER_USERNAME,
//   password: process.env.MANAGER_PASSWORD,
//   entities: [
//     Companies
//   ],
//   debug: process.env.NODE_ENV === "development",
// }
const entities = [
  Companies
]
class Db {
  private conn: MikroORM | null = null
  async getConn() {
    let config: Options
    if (this.conn === null) {
      switch (process.env.DB_TYPE) {
        case 'mongo':
          config = {
            dbName: "vidaliiManager",
            type: "mongo",
            clientUrl: process.env.MONGODB_CLIENT_URL,
            entities,
            debug: process.env.NODE_ENV === "development",
          }
          break;
      }
      this.conn = await MikroORM.init(config)
      // if (process.env.NODE_ENV === 'development') {
      //   const generator = this.conn.getSchemaGenerator();
      //   await generator.dropSchema();
      //   await generator.createSchema();
      //   const company = new Companies()
      //   company.host = 'localhost'
      //   company.user = 'sammy'
      //   company.password = 'alcala'
      //   company.port = 5432
      //   company.dbName = 'admin0'
      //   await this.conn.em.persistAndFlush(company)
      //    await generator.updateSchema()
      // }
    }
    if (!this.conn.isConnected)
      this.conn = await MikroORM.init(config)
    return this.conn
  }
}


// const startOrm = async () => MikroORM.init(config);

export default new Db()
