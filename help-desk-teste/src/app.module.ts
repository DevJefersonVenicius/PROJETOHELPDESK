import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './Users/users.module';
import { CallsModule } from './Call/calls.module';
import { UploadsModule } from './UploadsFiles/upload.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'help-desk-50',
    autoLoadEntities: true,
    synchronize: true,
    entities: [`${__dirname}/**/*.entity{.js, .ts}`],
  }),
  UsersModule,
  CallsModule,
  UploadsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
