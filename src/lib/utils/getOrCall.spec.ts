import { getOrCall } from './getOrCall';

describe('Supplier', () => {
  it('getOrCall', () => {
    expect(getOrCall(1)).toEqual(1);
    expect(getOrCall(() => 1)).toEqual(1);
  });
});
