import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception/http-exception.filter';
// import { TransformInterceptor } from './common/interceptor/transform/transform.interceptor';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(cookieParser());
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
