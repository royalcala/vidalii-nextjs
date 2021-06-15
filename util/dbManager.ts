import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { Options } from "@mikro-orm/core";
import { Companies } from "../entities/manager/Companies";

const config: Options = {
  dbName: "vidaliiManager",
  type:"postgresql",
  host: process.env.MANAGER_HOST,
  port: Number(process.env.MANAGER_PORT),
  user: process.env.MANAGER_USERNAME,
  password: process.env.MANAGER_PASSWORD,
  entities: [Companies],
  debug: process.env.NODE_ENV === "development",

}
const startOrm = async () => MikroORM.init(config);

export default startOrm;
