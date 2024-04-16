import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './Users/users.module';
import { CallsModule } from './Call/calls.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'help-desk',
    autoLoadEntities: true,
    synchronize: true,
    entities: [`${__dirname}/**/*.entity{.js, .ts}`],
  }),
  UsersModule,
  CallsModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
