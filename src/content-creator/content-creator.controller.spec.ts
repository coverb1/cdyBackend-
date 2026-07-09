import { Test, TestingModule } from '@nestjs/testing';
import { ContentCreatorController } from './content-creator.controller';
import { ContentCreatorService } from './content-creator.service';

describe('ContentCreatorController', () => {
  let controller: ContentCreatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentCreatorController],
      providers: [ContentCreatorService],
    }).compile();

    controller = module.get<ContentCreatorController>(ContentCreatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
