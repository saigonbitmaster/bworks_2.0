import { Module } from '@nestjs/common';
import { ContractService } from './service';
import { ContractController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Contract, ContractSchema } from './schemas/schema';

@Module({
  providers: [ContractService],
  controllers: [ContractController],
  imports: [
    MongooseModule.forFeature([
      { name: Contract.name, schema: ContractSchema },
    ]),
  ],
})
export class ContractModule {}
