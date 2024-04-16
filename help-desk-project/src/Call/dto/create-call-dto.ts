import { IsBoolean, IsEnum, IsString } from "class-validator";
import { CallPriority, CallStatus } from "../entities/call.entity";

export class CreateCallDTO {
    @IsString()
    title: string // TITULO

    @IsString()
    description: string // DESCRIÇÃO

    @IsEnum(CallStatus)
    status: CallStatus // STATUS CHAMADA

    @IsEnum(CallPriority)
    priority: CallPriority // PRIORIDADE

    @IsBoolean()
    technicalClosure?: boolean // FECHAMENTO TECNICO

    @IsBoolean()
    userClosure?: boolean // FECHAMENTO USUÁRIO

}
