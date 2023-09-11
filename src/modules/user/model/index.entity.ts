import { PrimaryColumn, Column, CreateDateColumn, Entity, Index, UpdateDateColumn } from 'typeorm';
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

  @Column()
  public password: string;
  @Column()
  public salt:string;


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
