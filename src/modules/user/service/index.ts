
import { User } from "../model/index.entity"
import { FindOneOptions,DataSource } from "typeorm"


export function useService(db:DataSource){
   const repository = db.getRepository(User);

   async function findAll(): Promise<User[]> {
    return await repository.find();
  }

  async function findOne(options: FindOneOptions<User>): Promise<User> {
    return await repository.findOne(options);
  }
  async function save(options){
    return await repository.save(options);
  }

   return {
    findAll,
    findOne,
    save
   }
}


