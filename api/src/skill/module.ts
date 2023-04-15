import { Module } from '@nestjs/common';
import { SkillService } from './service';
import { SkillController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill, SkillSchema } from './schemas/schema';

@Module({
  providers: [SkillService],
  controllers: [SkillController],
  exports: [SkillService],
  imports: [
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }]),
  ],
})
export class SkillModule {}
