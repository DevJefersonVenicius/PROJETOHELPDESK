import { Injectable } from '@nestjs/common';
import { UploadEntity } from './entities/upload-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(UploadEntity)
    private uploadsRepository: Repository<UploadEntity>
  ) {}
  
  async upload(filename: string): Promise<UploadEntity> {
    const upload = this.uploadsRepository.create({ filename })
    return await this.uploadsRepository.save(upload)
  }
  
  async getName(filename: string): Promise<UploadEntity> {
    return await this.uploadsRepository.findOne({
      where: {
        filename
      }
    })
  }
  
  async getId(id: number): Promise<UploadEntity> {
    return await this.uploadsRepository.findOne({
      where: {
        id
      }
    })
  }

  async delete(id: number): Promise<void> {
    await this.uploadsRepository.delete(id)
  }
  
  async update(id: number, filename: string): Promise<UploadEntity> {
    const upload = await this.uploadsRepository.findOne({
      where: {
        id,
        filename
      }
    })
    if (!upload) {
      return upload
    }
    upload.filename = filename
    await this.uploadsRepository.save(upload)
    return upload
  }

}
