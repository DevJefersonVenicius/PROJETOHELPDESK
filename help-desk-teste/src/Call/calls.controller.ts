import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { CreateCallDTO } from "./dto/create-call-dto";
import { CallsService } from "./calls..service";
import { UpdateCallDTO } from "./dto/update-call-dto";
import { UpdatePatchCallDTO } from "./dto/update-patch-call-dto";
import { CallEntity } from "./entities/call.entity";

@Controller('calls')
export class CallsController {
    constructor(private readonly callsService: CallsService) {}

    @Post()
    create(@Body() createCallDTO: CreateCallDTO) {
        return this.callsService.createCall(createCallDTO)
    }

    @Get()
    async read() {
        return this.callsService.list()
    }

    @Get(':id')
    async readOne(@Param('id')id: number) {
        return this.callsService.show(+id)
    }

    @Put(':id')
    async update(@Param('id')id: number, @Body() updateCallDTO: UpdateCallDTO) {
        return this.callsService.update(+id, updateCallDTO)
    }

    @Patch(':id')
    async updatePartial(@Param('id')id: number, @Body() updatePatchCallDTO: UpdatePatchCallDTO):
    Promise<CallEntity> {
        return await this.callsService.updatePartial(+id, updatePatchCallDTO)
    }

    @Delete(':id')
    async delete(@Param('id')id: number) {
        return this.callsService.delete(+id)
    }

}
