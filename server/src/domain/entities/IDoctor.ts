export default interface IDoctor {
   _id?: string;
   name?: string;
   phone?: string;
   qualification?: string;
   role?: "admin" | "doctor";
   isBlocked?: boolean;
   image?: string;
   email?: string;
   updatedAt?: string;
   createdAt?: string;
}