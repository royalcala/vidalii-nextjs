import {
  PrimaryKey,
  Entity,
  Property,
  Unique,
} from "@mikro-orm/core";

@Entity()
export class Companies {
  @PrimaryKey()
  id: number;

  @Property()
  host!: string;

  @Property()
  port: number;

  @Property()
  user: string;

  @Property()
  pass: string;

  @Property()
  db: string;

  // constructor(name: string, email: string) {
  //   this.name = name;
  //   this.email = email;
  // }
}
