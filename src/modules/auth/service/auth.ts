import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';
import * as jwt from 'jsonwebtoken';

import { Repository,DataSource } from 'typeorm';
//import config from '../../../config';
import { User } from "../../user/model/index.entity"
import {v4 as uuid} from "uuid"

export default class AuthService {
  repository:Repository<User>
  constructor(db:DataSource) {
    this.repository = db.getRepository(User);
  }

  public async SignUp(inputUser: any): Promise<{ user: User; token: string }> {
    try {
      const salt = randomBytes(32);

      /**
       * Hash password first
       */
      const hashedPassword = await argon2.hash(inputUser.password, { salt });
      const userRecord = await this.repository.save({
        ...inputUser,
        salt: salt.toString('hex'),
        password: hashedPassword,
      });

      const token = this.generateToken(userRecord);

      if (!userRecord) {
        throw new Error('User cannot be created');
      }

      //   await this.mailer.SendWelcomeEmail(userRecord);

      /**
       * @TODO This is not the best way to deal with this
       * There should exist a 'Mapper' layer
       * that transforms data from layer to layer
       */
      const user = userRecord;
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return { user, token };
    } catch (error) {
   
      throw error;
    }
  }

  public async SignIn(email: string, password: string): Promise<{ user: User; token: string }> {

    const record = await this.repository.findOne({ where: { email } });

    if (!record) {
      throw new Error('User not found!');
    }
    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
    const validPassword = await argon2.verify(record.password, password);
    if (validPassword) {

      const token = this.generateToken(record);
      const user = record;
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      /**
       * Return user and token
       */
      return { user, token };
    } else {
      throw new Error('Invalid Password');
    }
  }

  private generateToken(user: User): string {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    
    return jwt.sign(
      {
        id: user.id, // We are gonna use this in the middleware 'isAuth'
        role: user.role,
        name: user.name,
        sub: uuid(),
        exp: exp.getTime() / 1000,
      },
      global.$config.jwtSecret,
    );
  }
}
