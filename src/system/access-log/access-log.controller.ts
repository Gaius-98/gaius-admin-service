import { Controller, Get, Req, Query } from '@nestjs/common';
import { AccessLogService } from './access-log.service';
import { Public } from 'src/public/public.decorator';
@Controller('accessLog')
export class AccessLogController {
  constructor(private readonly accessLogService: AccessLogService) {}

  @Public()
  @Get('record')
  create(@Query('path') path: string, @Req() req: any) {
    return this.accessLogService.create(
      this.accessLogService.getIp(req),
      path,
      req.username,
    );
  }
  @Get('ip/count')
  getIpCount(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    return this.accessLogService.getIpCount(startTime, endTime);
  }
}
