import { Test, TestingModule } from '@nestjs/testing';
import { CharacterController } from './character.controller';

describe('CharacterController', () => {
  let controller: CharacterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharacterController],
    }).compile();

    controller = module.get<CharacterController>(CharacterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
