import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CallEntity } from "./entities/call.entity";
import { Repository } from "typeorm";
import { CreateCallDTO } from "./dto/create-call-dto";
import { UpdateCallDTO } from "./dto/update-call-dto";
import { UpdatePatchCallDTO } from "./dto/update-patch-call-dto";

@Injectable()
export class CallsService {
    constructor(
        @InjectRepository(CallEntity)
        private readonly callRepository: 
        Repository<CallEntity>
    ){}
    async createCall(createCallDTO: CreateCallDTO):Promise<CallEntity> {
        return this.callRepository.save({
            ...createCallDTO,
        })
    }

    async list() {
        return this.callRepository.find({
            relations: {
                user: true,
            }
        })
    }

    async show(id: number) {
        const call = await this.callRepository.findOne({
            where: {
                id,  
            }
        })
        if (!call) {
            throw new NotFoundException(`Chamada de ID ${id} não encontrado.`)
        }
        return call
    }

    async update(id: number, updateCallDTO: UpdateCallDTO): Promise<CallEntity> {
        const call = await this.callRepository.preload({
            id,
            ...updateCallDTO
          })
          if (!call) {
            throw new NotFoundException(`Chamada de ID ${id} não encontrado.`);
          }
          return this.callRepository.save(call)
        }
        
    async updatePartial(id: number, updatePatchCallDTO: UpdatePatchCallDTO): 
    Promise<CallEntity> {
          await this.callRepository.update(id, updatePatchCallDTO)
          return await this.callRepository.findOne({
            where: {
                id
            }
          })
        }

    async delete(id: number): Promise<{message: string }> {
        const call = await this.callRepository.findOne({
            where: {
                id,
            }
        })
        if (!call) {
            throw new NotFoundException(`Chamada de ID ${id} não encontrado.`)
        }
        const deleteme = await this.callRepository.delete(id)
        if (deleteme.affected === 0) {
            throw new NotFoundException(`Chamada de ID ${id} não encontrado.`)
        }
        return { message:`Chamada de ID ${id} foi deletado com sucesso.`}
    }
    
}
