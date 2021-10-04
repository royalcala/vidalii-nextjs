import { MikroORM, Options, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Users } from '../entities/admin/Users'
import { hash, hashSync } from 'bcrypt';
import { Companies } from "../entities/manager/Companies";
// $ sudo -u postgres psql postgres
// postgres=# \password postgres
type OptionsConn = {
  host: string,
  port: number,
  user: string,
  password: string,
  dbName: string
}

class Db {
  private conn = new Map<number, MikroORM>()
  constructor() { }
  async getConn(company: Companies): Promise<MikroORM> {
    if (this.conn.get(company.id)) {
      return this.conn.get(company.id) as any
    }
    else
      return this.createConn(company) as any
  }

  private async createConn(company: Companies) {
    let config:Options
    if (process.env.DB_TYPE === 'mongodb')
      config = {
        dbName: company.dbName,
        type: "mongo",
        host: company.host,
        port: company.port,
        user: company.user,
        password: company.password,
        entities: [
          Users
        ],
        debug: process.env.NODE_ENV === "development",
      }
    const conn = await MikroORM.init(config);
    this.conn.set(company.id, conn)
    // if (process.env.NODE_ENV === 'development')
    //   await this.init_schemas(company.id)
    return this.conn.get(company.id)
  }
  private async init_schemas(id_company: number) {
    console.log('initSchema-development')
    const conn = this.conn.get(id_company)
    const generator = conn?.getSchemaGenerator();
    await generator?.dropSchema()
    await generator?.createSchema();
    const user = new Users()
    user.admin = true
    user.email = "alcala.rao@gmail.com"
    user.firstname = "Roy"
    user.lastname = "alcala"
    user.password = await hash('alcala', 10)
    user.groups = []
    await conn?.em.persistAndFlush(user)
    // await generator?.dropSchema();
    // await generator?.updateSchema();
  }
}

export default new Db()
