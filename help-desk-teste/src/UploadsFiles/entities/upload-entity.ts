import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UploadEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  filename: string

}
