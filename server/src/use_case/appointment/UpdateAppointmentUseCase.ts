import { AppointmentStatus } from "../../domain/entities/IAppointment";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";

export default class UpdateAppointmentUseCase {
    constructor(
        private appointmentRepository: IAppointmentRepository,
        private validatorService: IValidatorService
    ) { }

    async updateStatus(appointedId: string, status: AppointmentStatus): Promise<void> {
        this.validatorService.validateRequiredFields({ appointedId, status })
        this.validatorService.validateIdFormat(appointedId);
        this.validatorService.validateEnum(status, Object.values(AppointmentStatus));
        await this.appointmentRepository.update({ _id: appointedId, status })
    }
}