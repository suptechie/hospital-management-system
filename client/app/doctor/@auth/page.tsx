import SigninForm from "@/components/forms/doctor/SigninForm";
import { Banners } from "@/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
   title: "Signin",
};

const SignIn = () => {
   return (
      <div className="flex h-screen max-h-screen">
         <section className="remove-scrollbar container my-auto">
            <div className="sub-container max-[496px]">
               <Image
                  src={"/assets/icons/logo-full.svg"}
                  width={1000}
                  height={1000}
                  alt="patient"
                  className="mb-12 h-10 w-fit"
               />
               <SigninForm />
               <div className="text-14-regular mt-20 flex justify-between">
                  <p className="justify-items-end text-dark-600 xl:text-left">
                     © {new Date().getFullYear()} AVM Ayurvedic.
                  </p>
                  <Link href={"/admin"} className="text-green-500">
                     Admin
                  </Link>
               </div>
            </div>
         </section>

         <Image src={Banners.doctor_signin} height={1000} width={1000} alt="patient" className="side-img max-w-[50%]" />
      </div>
   );
};

export default SignIn;
