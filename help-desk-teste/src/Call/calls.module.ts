import { Module } from "@nestjs/common";
import { CallsService } from "./calls..service";
import { CallsController } from "./calls.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CallEntity } from "./entities/call.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CallEntity])],
    exports: [CallsService],
    providers: [CallsService],
    controllers: [CallsController],
})
export class CallsModule {

}
