import { Test, TestingModule } from '@nestjs/testing';
import { JobBidService } from './service';

describe('JobBidService', () => {
  let service: JobBidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobBidService],
    }).compile();

    service = module.get<JobBidService>(JobBidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
