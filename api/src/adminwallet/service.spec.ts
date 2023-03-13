import { Test, TestingModule } from '@nestjs/testing';
import { AdminWalletService } from './service';

describe('AdminWalletService', () => {
  let service: AdminWalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminWalletService],
    }).compile();

    service = module.get<AdminWalletService>(AdminWalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
