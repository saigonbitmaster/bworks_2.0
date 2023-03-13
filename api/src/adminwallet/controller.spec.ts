import { Test, TestingModule } from '@nestjs/testing';
import { AdminWalletController } from './controller';

describe('AdminWalletController', () => {
  let controller: AdminWalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminWalletController],
    }).compile();

    controller = module.get<AdminWalletController>(AdminWalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
