import { MikroORM, Options, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Users } from '../entities/admin/Users'
import { hash, hashSync } from 'bcrypt';
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
  async getConn(id_company: number, options: OptionsConn) {

    if (this.conn.get(id_company)?.isConnected) {
      return this.conn.get(id_company)
    }
    else
      return this.createConn(id_company, options)
  }

  private async createConn(id_company: number, options: OptionsConn) {
    const config: Options = {
      dbName: options.dbName,
      type: "postgresql",
      host: options.host,
      port: options.port,
      user: options.user,
      password: options.password,
      entities: [
        Users
      ],
      debug: process.env.NODE_ENV === "development",
    }
    const conn = await MikroORM.init(config);
    this.conn.set(id_company, conn)
    if (process.env.NODE_ENV === 'development')
      await this.init_schemas(id_company)
    return this.conn.get(id_company)
  }
  private async init_schemas(id_company: number) {
    console.log('initSchema-development')
    const conn = this.conn.get(id_company)
    const generator = conn?.getSchemaGenerator();
    await generator?.createSchema();
    const user = new Users()
    user.admin = true
    user.email = "alcala.rao@gmail.com"
    user.firstname = "Roy"
    user.lastname = "alcala"
    user.password = await hash("alcala",10)
    user.groups=[]
    await conn?.em.persistAndFlush(user)    
    // await generator?.dropSchema();
    // await generator?.updateSchema();
  }
}

export default new Db()
