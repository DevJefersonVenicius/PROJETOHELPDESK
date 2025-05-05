import { Body, Controller, Delete, Get, Patch, Post, Put, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDTO } from "./dto/create-user-dto";
import { UpdateUserDTO } from "./dto/update-user-dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user-dto";
import { UserEntity } from "./entities/user.entity";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDTO: CreateUserDTO) {
        return this.usersService.createUser(createUserDTO)
    }

    @Get()
    async read() {
        return this.usersService.list()
    }

    @Get(':id')
    async readOne(@Param('id')id: number) {
        return this.usersService.show(+id)
    }

    @Put(':id')
    async update(@Param('id')id: number, @Body() updateUserDTO: UpdateUserDTO) {
        return this.usersService.update(+id, updateUserDTO)
    }

    @Patch(':id')
    async updatePartial(@Param('id')id: number, @Body() updatePatchUserDTO: UpdatePatchUserDTO):
    Promise<UserEntity> {
        return await this.usersService.updatePartial(+id, updatePatchUserDTO)
    }

    @Delete(':id')
    async delete(@Param('id')id: number) {
        return this.usersService.delete(+id)
    }

}
