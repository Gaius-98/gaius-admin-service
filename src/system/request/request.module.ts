import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { HttpModule } from '@nestjs/axios';
@Module({
  controllers: [RequestController],
  providers: [RequestService],
  imports: [
    TypeOrmModule.forFeature([Request]),
    HttpModule.register({
      timeout: 60000,
    }),
  ],
})
export class RequestModule {}
