import { Module, Global } from '@nestjs/common';
import { SettingService } from './service';
import { MongooseModule } from '@nestjs/mongoose';
import { Setting, SettingSchema } from './schemas/schema';
import { JwtService } from '@nestjs/jwt';
import { SettingController } from './controller';

@Global()
@Module({
  providers: [SettingService, JwtService],
  controllers: [SettingController, SettingController],
  imports: [
    MongooseModule.forFeature([{ name: Setting.name, schema: SettingSchema }]),
  ],
  exports: [SettingService],
})
export class SettingModule {}
