import { GetMonthNamePipe } from './get-month-name.pipe';

describe('Pipe: GetMonthNamee', () => {
  it('create an instance', () => {
    let pipe = new GetMonthNamePipe();
    expect(pipe).toBeTruthy();
  });

  it('shoulde return March after pass 3', () => {
    let pipe = new GetMonthNamePipe();
    let value = pipe.transform(3)
    expect(value).toEqual("MARCH");
  });
});
