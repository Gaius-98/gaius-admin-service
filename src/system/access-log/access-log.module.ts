import { Module } from '@nestjs/common';
import { AccessLogService } from './access-log.service';
import { AccessLogController } from './access-log.controller';
import { AccessLog } from './entities/access-log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { geoLocationService } from 'src/common/geoip/geoLocation.service';
import IP2Region from 'ip2region';
@Module({
  controllers: [AccessLogController],
  providers: [AccessLogService, geoLocationService, IP2Region],
  imports: [TypeOrmModule.forFeature([AccessLog])],
})
export class AccessLogModule {}
