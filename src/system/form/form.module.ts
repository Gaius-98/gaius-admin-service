import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { TemplateService } from 'src/common/template/TemplateService';
import { FormatService } from 'src/common/format/FormatService';

@Module({
  controllers: [FormController],
  providers: [FormService, TemplateService, FormatService],
  imports: [TypeOrmModule.forFeature([Form])],
})
export class FormModule {}
