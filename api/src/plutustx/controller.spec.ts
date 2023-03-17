import { Test, TestingModule } from '@nestjs/testing';
import { PlutusTxController } from './controller';

describe('PlutusTxController', () => {
  let controller: PlutusTxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlutusTxController],
    }).compile();

    controller = module.get<PlutusTxController>(PlutusTxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
