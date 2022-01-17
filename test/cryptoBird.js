const KryptoBird = artifacts.require('KryptoBird');

contract('KryptoBird', () => {
  it('Should construct the metadata', async () => {
    const nameState = 'KryptoBird';
    const symbolState = 'KBIRDZ';

    const kryptoBird = await KryptoBird.new();

    const name = await kryptoBird.name();
    const symbol = await kryptoBird.symbol();

    assert(nameState === name);
    assert(symbolState === symbol);
  });
});
