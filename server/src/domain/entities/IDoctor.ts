export default interface IDoctor {
   readonly _id?: string;
   name?: string;
   phone?: string;
   password?: string;
   qualifications?: string[];
   role?: "admin" | "doctor";
   isBlocked?: boolean;
   image?: string;
   email?: string;
   updatedAt?: string;
   createdAt?: string;
   token?: string;
   isVerified?: boolean;
}
