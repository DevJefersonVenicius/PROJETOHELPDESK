import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { UploadEntity } from './entities/upload-entity';
import { UploadsController } from './upload.controller';
import { UploadsService } from './upload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UploadEntity]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
