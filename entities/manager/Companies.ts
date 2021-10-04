import {
    PrimaryKey,
    Entity,
    Property,
} from "@mikro-orm/core";
@Entity()
export class Companies {
    @PrimaryKey()
    _id: string;

    @Property()
    uri: string

}
