import { Module } from '@nestjs/common';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from "./items/items.module";

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), ItemsModule, AuthModule],
})
export class AppModule {}
