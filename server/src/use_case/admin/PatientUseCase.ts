import { IPatient } from "../../domain/entities/Patient";
import IPatientRepository from "../../interface/repositories/IPatientRepository";
import { PaginatedResult } from "../../types";

export default class AdminPatientUseCase {
   constructor(private patientRepository: IPatientRepository) {}

   async getAll(offset:number,limit:number):Promise<PaginatedResult<IPatient>>{
    return await this.patientRepository.findMany(offset,limit)
   }

   async blockUnblock(id:string,isBlocked:boolean){
      return await this.patientRepository.update({_id:id,isBlocked:!isBlocked})
   }
   
}
