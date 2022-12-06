import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

@Entity('Task')
@ObjectType() // map this to be a graphql type
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int) // map out field in the graphql
    id!: number;

    @CreateDateColumn()
    @Field(() => Date)// map out field in the graphql)
    created!: Date

    @UpdateDateColumn()
    @Field(() => Date)// map out field in the graphql
    updated!: Date

    @Column()
    @Field(() => String)// map out field in the graphql
    title!: string

    @Column()
    @Field(() => Boolean) // map out field in the graphql)
    isComplete!: boolean;
}