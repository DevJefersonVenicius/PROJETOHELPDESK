import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Res, Patch, NotFoundException, Body, Delete, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './upload.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import * as fs from 'fs';
import * as mime from 'mime-types';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}
  
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async uploadFile(@UploadedFile() file) {
    const { filename } = file
    return this.uploadsService.upload(filename)
  }
  
  @Get(':filename')
  async getName(@Param('filename') filename: string, @Res() res: Response) {
    if (!fs.existsSync(`./uploads/${filename}`)) {
      return res.status(404).send({
        message:'Arquivo não encontrado'
      })
    }
    const file = fs.readFileSync(`./uploads/${filename}`)
    const contentType = mime.contentType(filename)
    res.writeHead(200, {'Content-Type': contentType || 'application/octet-stream'})
    res.end(file)
  }
  
  @Get('id/:id')
  async getId(@Param('id') id: number, @Res() res: Response) {
    if (isNaN(id)) {
      return res.status(400).send({
        message:'Parametro passado incompativel'
      })
    }
    const upload = await this.uploadsService.getId(id)
    if (!upload || !fs.existsSync(`./uploads/${upload.filename}`) || isNaN(id)) {
      return res.status(404).send({
        message:'Arquivo não encontrado'
      })
    }
    const file = fs.readFileSync(`./uploads/${upload.filename}`);
    const contentType = mime.contentType(upload.filename);
    res.writeHead(200, {'Content-Type': contentType || 'application/octet-stream'})
    res.end(file)
  }

  
  @Delete('id/:id')
  async delete(@Param('id') id: number) {
    if (isNaN(id)) {
      return new NotFoundException('Dado incompativel com ID')
    }
    const upload = await this.uploadsService.getId(id)
    
    if (!upload) {
      throw new NotFoundException('Arquivo não encontrado')
    }
    
    fs.unlink(`./uploads/${upload.filename}`, (err) => {
      if (err) {
        console.error(err);
        return null
      }
    })
    
    await this.uploadsService.delete(id);
    return {
      message:'Arquivo deletado com sucesso'
    }
  }

  @Patch('id/:id')
  async update(@Param('id')id: number, filename: string) {
    await this.uploadsService.update(id, filename)
  }
}
