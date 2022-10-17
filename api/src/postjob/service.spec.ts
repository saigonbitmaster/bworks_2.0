import { Test, TestingModule } from '@nestjs/testing';
import { PostJobService } from './service';

describe('PostJobService', () => {
  let service: PostJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostJobService],
    }).compile();

    service = module.get<PostJobService>(PostJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
