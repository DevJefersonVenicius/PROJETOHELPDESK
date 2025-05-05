import { UserEntity } from "src/Users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum CallStatus {
    OPEN = 'aberta',
    CLOSE = 'fechada',
    IN_PROGRESS  = 'em andamento'
}

export enum CallPriority {
    LOW = 'baixa',
    HIGH = 'alta',
    URGENT = 'urgente'
}

@Entity({name: "call"})
export class CallEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number

    @Column({
        length: 50,
        nullable: false,
    })
    title: string // TITULO

    @Column({
        length: 120,
        nullable: false,
    })
    description: string // DESCRIÇÃO

    @Column({
        type: 'enum',
        default: CallStatus.OPEN,
        nullable: false,
        enum: CallStatus
    })
    status: CallStatus // STATUS CHAMADA

    @Column({
        type: 'enum',
        default: CallPriority.LOW,
        nullable: false,
        enum: CallPriority
    })
    priority: CallPriority // PRIORIDADE

    @Column({
        nullable: false
    })
    technicalClosure?: boolean // FECHAMENTO TECNICO

    @Column({
        nullable: false,
    })
    userClosure?: boolean // FECHAMENTO USUÁRIO

    @CreateDateColumn()
    createAt: Date // DATA DA CRIAÇÃO

    @UpdateDateColumn()
    updateAt: Date // DATA DA ATUALIZAÇÃO
    
    @ManyToOne(() => UserEntity, (user) => user.calls)
    @JoinColumn({name: 'user_registration', referencedColumnName: 'registration'})
    user?: CallEntity

    // IMAGEM, 
    
}
