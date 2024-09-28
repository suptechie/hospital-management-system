import { withTempBaseUrl } from "@/lib/utils/withTempBaseUrl";
import patientAxiosInstance from "../patient/authorizedRoutes";
import doctorAxiosInstance from "../doctor/authorizedRoutes";

const patientBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/video/patient`;
const doctorBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/video/doctor`;

export const getSectionsInOneDayPatient = async () => {
   const response = await withTempBaseUrl(patientAxiosInstance, patientBaseUrl, {
      method: "GET",
      url: `/day`,
   });
   return response.data;
};

export const getSectionsInOneDayDoctor = async () => {
   const response = await withTempBaseUrl(doctorAxiosInstance, doctorBaseUrl, {
      method: "GET",
      url: `/day`,
   });
   return response.data;
};
