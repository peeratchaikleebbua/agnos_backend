import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientFormModule } from './patient-form/patient-form.module';

@Module({
  imports: [PatientFormModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
