import { Module } from '@nestjs/common';
import { PlutusTxService } from './service';
import { PlutusTxController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlutusTx, PlutusTxSchema } from './schemas/schema';
import { JobBidModule } from '../jobbid/module';
import { MailModule } from '../mail/mail.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [PlutusTxService],
  controllers: [PlutusTxController],
  exports: [PlutusTxService],
  imports: [
    MongooseModule.forFeature([
      { name: PlutusTx.name, schema: PlutusTxSchema },
    ]),
    JobBidModule,
    MailModule,
    UserModule,
  ],
})
export class PlutusTxModule {}
