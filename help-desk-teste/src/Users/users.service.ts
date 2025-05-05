import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user-dto";
import { NotFoundException } from "@nestjs/common";
import { UpdateUserDTO } from "./dto/update-user-dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user-dto";
import { createPasswordHashed } from "src/utils/password";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: 
        Repository<UserEntity>
    ){}
    async createUser(createUserDTO: CreateUserDTO):Promise<UserEntity> {
        const passwordHashed = await createPasswordHashed(createUserDTO.password)
        return this.userRepository.save({
            ...createUserDTO,
            password: passwordHashed,
        })
    }

    async list() {
        return this.userRepository.find({})
    }

    async show(id: number) {
        const user = await this.userRepository.findOne({
            where: {
                registration: id,  
            }
        })
        if (!user) {
            throw new NotFoundException(`Usúario de ID ${id} não encontrado.`)
        }
        return user
    }

    async update(id: number, updateUserDTO: UpdateUserDTO): Promise<UserEntity> {
        const user = await this.userRepository.preload({
            registration: +id,
            ...updateUserDTO
          });
          if (!user) {
            throw new NotFoundException(`Usuário de ID ${id} não encontrado.`);
          }
          return this.userRepository.save(user)
        }
        
    async updatePartial(id: number, updatePatchUserDTO: UpdatePatchUserDTO): 
    Promise<UserEntity> {
          await this.userRepository.update(id, updatePatchUserDTO)
          return await this.userRepository.findOne({
            where: {
              registration: id
            }
          })
        }

    async delete(id: number): Promise<{message: string }> {
        const user = await this.userRepository.findOne({
            where: {
                registration: id,
            }
        })
        if (!user) {
            throw new NotFoundException(`Usuário de ID ${id} não encontrado.`)
        }
        const deleteme = await this.userRepository.delete(id)
        if (deleteme.affected === 0) {
            throw new NotFoundException(`Usuário de ID ${id} não encontrado.`)
        }
        return { message: `Usuário de ID ${id} foi deletado com sucesso.` }
    }
}
