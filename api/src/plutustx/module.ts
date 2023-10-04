import { Module } from '@nestjs/common';
import { PlutusTxService } from './service';
import { PlutusTxController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlutusTx, PlutusTxSchema } from './schemas/schema';
import { JobBidModule } from '../jobbid/module';

@Module({
  providers: [PlutusTxService],
  controllers: [PlutusTxController],
  exports: [PlutusTxService],
  imports: [
    MongooseModule.forFeature([
      { name: PlutusTx.name, schema: PlutusTxSchema },
    ]),
    JobBidModule,
  ],
})
export class PlutusTxModule {}
