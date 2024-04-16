import { IsEnum, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { UsersLevel, UsersSpecialty, UsersType } from "../entities/user.entity";

export class CreateUserDTO {
    @IsString()
    name: string // NOME

    @IsString()
    userName: string // NOME DE USUÁRIO
    
    @IsStrongPassword({
        minLength: 0,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0,
        minUppercase: 0,
    })
    password: string // SENHA

    @IsString()
    sector: string

    @IsString()
    ext: string // RAMAL

    @IsEnum(UsersType)
    type: UsersType // TIPO DE USUÁRIO

    @IsOptional()
    @IsEnum(UsersLevel) // NIVEL DO USUÁRIO
    level?: UsersLevel

    @IsOptional()
    @IsEnum(UsersSpecialty) // ESPECIALIDADE
    specialty?: UsersSpecialty

}