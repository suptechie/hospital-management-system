import IOtp from "../../domain/entities/IOtp";

export default interface IOtpRepository {
   create(otp: number, email: string): Promise<void>;
   findOne(otp: number, email: string): Promise<IOtp | null>;
   delete(otp: number, email: string): Promise<void>;
}