import { CallEntity } from "src/Call/entities/call.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum UsersType {
    USE = 'usuário',
    TEC = 'tecnico',
    ADM = 'administrador'
}

export enum UsersLevel {
    USE = 'null',
    JUN = 'júnior',
    PLE = 'pleno',
    SNR = 'senior',
}

export enum UsersSpecialty {
    HARD = 'hardware',
    SOFT = 'software',
    USER = 'null'
}

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn('rowid') // ID DO USUÁRIO
    registration: number  

    @Column({
        length: 30,
        nullable: false,
    })
    name: string // NOME

    @Column({
        length: 20,
        nullable: false,
    })
    userName: string // NOME DE USUÁRIO

    @Column({
        nullable: false,
    })
    password: string // SENHA

    @Column({
        length: 120,
        nullable: false,
    })
    sector: string // SETOR

    @Column({
        type: 'enum',
        nullable: false,
        default: UsersType.USE,
        enum: UsersType
    })
    type: UsersType // TIPO DE USUÁRIO

    @Column({
        type: 'enum',
        nullable: true,
        default: UsersLevel.USE,
        enum: UsersLevel
    })
    level?: UsersLevel // NIVEL DO USUÁRIO

    @Column({
        type: 'enum',
        nullable: true,
        default: UsersSpecialty.USER,
        enum: UsersSpecialty
    })
    specialty?: UsersSpecialty // ESPECIALIDADE

    @Column({
        length: 120,
        nullable: false,
    })
    ext: string // RAMAL

    @CreateDateColumn()
    createAt: Date // DATA DA CRIAÇÃO

    @UpdateDateColumn()
    updateAt: Date // DATA DA ATUALIZAÇÃO

    @OneToMany(() => CallEntity, (calls) => calls.user)
    calls?: CallEntity[] // RELACIONAMENTO UM USUÁRIO PARA MUITAS CHAMADAS

}
