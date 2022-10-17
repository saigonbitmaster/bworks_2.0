import { Test, TestingModule } from '@nestjs/testing';
import { PostJobController } from './controller';

describe('PostJobController', () => {
  let controller: PostJobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostJobController],
    }).compile();

    controller = module.get<PostJobController>(PostJobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
