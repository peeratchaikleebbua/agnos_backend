import { Module } from '@nestjs/common';
import { PatientFormService } from './patient-form.service';
import { PatientFormGateway } from './patient-form.gateway';

@Module({
  providers: [PatientFormGateway, PatientFormService],
})
export class PatientFormModule {}
