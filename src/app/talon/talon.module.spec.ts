import { TalonModule } from './talon.module';

describe('TalonModule', () => {
  let talonModule: TalonModule;

  beforeEach(() => {
    talonModule = new TalonModule();
  });

  it('should create an instance', () => {
    expect(talonModule).toBeTruthy();
  });
});
