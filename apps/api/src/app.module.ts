import { Module } from '@nestjs/common';
import { ParcelsModule } from './modules/parcels/parcels.module';
import { HealthController } from './health.controller';

@Module({
  imports: [ParcelsModule],
  controllers: [HealthController],
})
export class AppModule {}
