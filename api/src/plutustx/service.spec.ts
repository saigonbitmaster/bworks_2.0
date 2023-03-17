import { Test, TestingModule } from '@nestjs/testing';
import { PlutusTxService } from './service';

describe('PlutusTxService', () => {
  let service: PlutusTxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlutusTxService],
    }).compile();

    service = module.get<PlutusTxService>(PlutusTxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
