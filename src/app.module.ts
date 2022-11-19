import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diarista } from './diarista/diarista.entity';
import { DiaristaModule } from './diarista/diarista.module';

@Module({
  imports: [
    DiaristaModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'project_nest',
      entities: [Diarista],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
