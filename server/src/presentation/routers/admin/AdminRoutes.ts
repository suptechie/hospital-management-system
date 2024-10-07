import { Router } from "express";
import PatientRepository from "../../../infrastructure/repositories/PatientRepository";
import AdminPatientController from "../../controllers/admin/PatientController";
import AdminPatientUseCase from "../../../use_case/admin/PatientUseCase";

import DoctorRepository from "../../../infrastructure/repositories/DoctorRepository";
import NodeMailerService from "../../../infrastructure/services/NodeMailerService";
import AdminDoctorController from "../../controllers/admin/DoctorController";
import AdminDoctorUseCase from "../../../use_case/admin/DoctorUseCase";
import JoiService from "../../../infrastructure/services/JoiService";
import AdminDashBoardUseCase from "../../../use_case/admin/DashboardUseCase";
import AppointmentRepository from "../../../infrastructure/repositories/AppointmentRepository";
import AdminController from "../../controllers/admin/AdminController";

const router = Router();

const patientRepository = new PatientRepository();
const doctorRepository = new DoctorRepository();
const appointmentRepository = new AppointmentRepository();
const emailService = new NodeMailerService();
const validatorService = new JoiService();
const adminPatientUseCase = new AdminPatientUseCase(patientRepository, validatorService);
const adminPatientController = new AdminPatientController(adminPatientUseCase);

const adminDoctorUseCase = new AdminDoctorUseCase(doctorRepository, emailService, validatorService);
const adminDashBoardUseCase = new AdminDashBoardUseCase(validatorService, patientRepository, appointmentRepository, doctorRepository)

const adminDoctorController = new AdminDoctorController(adminDoctorUseCase);
const adminController = new AdminController(adminDashBoardUseCase);


router.get('/patient-gender', adminController.getGenderStatics.bind(adminController));

router
   .route("/patient")
   .get(adminPatientController.getPatients.bind(adminPatientController))
   .put(adminPatientController.updatePatient.bind(adminPatientController));
router
   .route("/doctor")
   .get(adminDoctorController.getDoctors.bind(adminDoctorController))
   .put(adminDoctorController.updateDoctor.bind(adminDoctorController));


export default router;
