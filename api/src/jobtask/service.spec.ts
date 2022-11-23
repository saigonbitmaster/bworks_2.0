import { Test, TestingModule } from '@nestjs/testing';
import { JobTaskService } from './service';

describe('JobTaskService', () => {
  let service: JobTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobTaskService],
    }).compile();

    service = module.get<JobTaskService>(JobTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
