import { Injectable } from '@nestjs/common';
import IP2Region from 'ip2region';
@Injectable()
export class geoLocationService {
  constructor(private ip2region: IP2Region) {}
  getLocationByIp(ip: string) {
    return this.ip2region.search(ip);
  }
}
