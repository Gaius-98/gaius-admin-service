import { Injectable } from '@nestjs/common';
import { CreateAccessLogDto } from './dto/create-access-log.dto';
import { UpdateAccessLogDto } from './dto/update-access-log.dto';
import { AccessLog } from './entities/access-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { geoLocationService } from 'src/common/geoip/geoLocation.service';
import { Like, Repository, In, QueryBuilder } from 'typeorm';
@Injectable()
export class AccessLogService {
  constructor(
    private geoLocationService: geoLocationService,
    @InjectRepository(AccessLog)
    private LogRepository: Repository<AccessLog>,
  ) {}
  async create(ip: string, url: string, username: string) {
    const { province, city } = this.geoLocationService.getLocationByIp(ip);
    const logData = await this.LogRepository.create({
      ip,
      url,
      province,
      city,
      username,
    });
    try {
      await this.LogRepository.save(logData);
    } catch (error) {
      console.log(error);
    }
  }
  async getIpCount(startTime: string, endTime: string) {
    const data = await this.LogRepository.createQueryBuilder('log')
      .select('log.ip,count(log.ip) as count,log.province,log.city')
      .where('log.createTime BETWEEN :startTime AND :endTime', {
        startTime,
        endTime,
      })
      .groupBy('log.ip')
      .getRawMany();
    return data;
  }
  getIp(_http) {
    const ipStr =
      _http.headers['x-real-ip'] || _http.headers['x-forwarded-for'];
    if (ipStr) {
      const ipArray = ipStr.split(',');
      if (ipArray || ipArray.length > 0) {
        //如果获取到的为ip数组
        return ipArray[0];
      }
    } else {
      //获取不到时
      return _http.ip.substring(_http.ip.lastIndexOf(':') + 1);
    }
  }
}
