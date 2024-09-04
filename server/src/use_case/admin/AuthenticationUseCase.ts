import { emit } from "process";
import IDoctorRepository from "../../interface/repositories/IDoctorRepository";
import IOtpRepository from "../../interface/repositories/IOtpRepository";
import IEmailService from "../../interface/services/IEmailService";
import { IPasswordServiceRepository } from "../../interface/services/IPasswordServiceRepository";
import ITokenService from "../../interface/services/ITokenService";
import { generateOTP } from "../../utils";
export default class AuthenticationUseCase {
   constructor(
      private adminRepository: IDoctorRepository,
      private passwordService: IPasswordServiceRepository,
      private tokenService: ITokenService,
      private emailService: IEmailService,
      private otpRepository: IOtpRepository
   ) {}

   async login(email: string, password: string): Promise<void> {
      const doctor = await this.adminRepository.findByEmail(email);
      if (!doctor) throw new Error("Admin Not Found");
      if (!(await this.passwordService.compare(password, doctor.password!))) throw new Error("Invalid Credentials");

      let otp = parseInt(generateOTP(6), 10);
      while (otp.toString().length !== 6) {
         otp = parseInt(generateOTP(6), 10);
      }

      await this.otpRepository.create(otp, email);

      await this.emailService.sendOtp(email, "Admin", otp);
   }

   async validateOtp(email: string, otp: number): Promise<{ accessToken: string; refreshToken: string }> {
      const requestedOtp = await this.otpRepository.findOne(otp, email);
      if (!requestedOtp) throw new Error("Invalid Credentials");

      const admin = await this.adminRepository.findByEmailWithCredentials(email);
      if (!admin) throw new Error("Not Found");

      const accessToken = this.tokenService.createAccessToken(email, admin?._id!);
      const refreshToken = this.tokenService.createRefreshToken(email, admin?._id!);

      admin!.token = refreshToken;
      await this.adminRepository.findByIdAndUpdate(admin);
      await this.otpRepository.deleteMany(email);

      return { accessToken, refreshToken };
   }

   async resendOtp(email: string) {
      const admin = await this.adminRepository.findByEmail(email);
      if (!admin) throw new Error("Not Found");

      let otp = parseInt(generateOTP(6), 10);
      while (otp.toString().length !== 6) {
         otp = parseInt(generateOTP(6), 10);
      }

      await this.otpRepository.create(otp, email);

      await this.emailService.sendOtp(email, "Admin", otp);
   }
}
