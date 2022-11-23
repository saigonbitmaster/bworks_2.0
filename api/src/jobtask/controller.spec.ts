import { Test, TestingModule } from '@nestjs/testing';
import { JobTaskController } from './controller';

describe('JobTaskController', () => {
  let controller: JobTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobTaskController],
    }).compile();

    controller = module.get<JobTaskController>(JobTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
