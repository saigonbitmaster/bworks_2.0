import { Test, TestingModule } from '@nestjs/testing';
import { JobBidController } from './controller';

describe('JobBidController', () => {
  let controller: JobBidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobBidController],
    }).compile();

    controller = module.get<JobBidController>(JobBidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
