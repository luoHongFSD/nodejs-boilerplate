import {PrimaryColumn, Column, CreateDateColumn, Entity, Index, ObjectIdColumn, UpdateDateColumn } from 'typeorm';
import { lowercase } from './ValueTransformers';

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}

@Entity()
export class User {
  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;

  @Index({ unique: true })
  @Column({
    unique: true,
    nullable: false,
    transformer: [lowercase],
  })
  public email: string;


  @Column()
  public role: Role;

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;

  // @AfterLoad()
  // public deletePropertis(): void {
  //   // delete this.password;
  //   // delete this.salt;
  //   delete this.email;
  //   if (this.password) {
  //     console.log(this.password);
  //   }
  // }
}
