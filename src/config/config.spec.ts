import Config from './config'

describe('Config', () => {
  let config: Function;

  beforeEach(async () => {
    config = Config
  });

  it('should be defined', () => {
    expect(config).toBeDefined();
  });

  it('should return object', () => {
    expect(config()).toBeInstanceOf(Object)
  })
});
