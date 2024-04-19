import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './system/user/user.module';
import { AuthModule } from './system/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { MenuModule } from './system/menu/menu.module';
import { DictModule } from './system/dict/dict.module';
import * as path from 'path';
import { TransformInterceptor } from './common/interceptor/transform/transform.interceptor';
import { RoleModule } from './system/role/role.module';
import { RequestModule } from './system/request/request.module';
const env = process.env.NODE_ENV == 'production' ? 'prod' : 'dev';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        env == 'prod' ? path.resolve('.env.prod') : path.resolve('.env.dev'),
      ],
      ignoreEnvFile: false,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      autoLoadEntities: true, //自动加载实体
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT), // 端口号
      username: process.env.DB_USER, // 用户名
      password: process.env.DB_PWD, // 密码
      database: process.env.DB_DATABASE, //数据库名
      synchronize: env == 'prod' ? false : true, //是否自动同步实体文件,生产环境建议关闭
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          global: true,
          signOptions: {
            expiresIn: '1h',
          },
        };
      },
    }),
    UserModule,
    AuthModule,
    MenuModule,
    DictModule,
    RoleModule,
    RequestModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
