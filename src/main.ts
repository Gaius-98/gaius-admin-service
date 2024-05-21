import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception/http-exception.filter';
// import { TransformInterceptor } from './common/interceptor/transform/transform.interceptor';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(cookieParser());
  const port = process.env.PORT || 3000;
  app.useStaticAssets(join(__dirname, '../', 'uploads'), {
    prefix: '/uploads',
  });
  await app.listen(port);
}
bootstrap();
