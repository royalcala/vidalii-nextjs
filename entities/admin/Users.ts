import {
    PrimaryKey,
    Entity,
    Property,
    Unique,
    ArrayType
  } from "@mikro-orm/core";
  import {
    IsEmail,
  } from 'class-validator';
  @Entity()
  export class Users {
    @PrimaryKey()
    id: number;

    @Property()
    firstname:string

    @Property()
    lastname:string

    @IsEmail()
    @Property()
    email:string

    @Property()
    password:string

    @Property()
    admin:boolean

    @Property({ type: ArrayType, nullable: true })
    groups: string[];
  }
