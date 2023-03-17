import { Module } from '@nestjs/common';
import { PlutusTxService } from './service';
import { PlutusTxController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlutusTx, PlutusTxSchema } from './schemas/schema';

@Module({
  providers: [PlutusTxService],
  controllers: [PlutusTxController],
  imports: [
    MongooseModule.forFeature([
      { name: PlutusTx.name, schema: PlutusTxSchema },
    ]),
  ],
})
export class PlutusTxModule {}
