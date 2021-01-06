import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Restaurant extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Field(() => String)
  @Column()
  @IsString()
  @Length(5, 20)
  name: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ nullable: true })
  @IsBoolean()
  @IsOptional()
  isVegan: boolean;

  @Field(() => String)
  @Column()
  address: string;
}
