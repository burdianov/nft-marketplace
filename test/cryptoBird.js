const { assert } = require('chai');

const KryptoBird = artifacts.require('KryptoBird');

contract('KryptoBird', () => {
  let kryptoBird = null;
  let error = '';

  const nameState = 'KryptoBird';
  const symbolState = 'KBIRDZ';

  before(async () => {
    kryptoBird = await KryptoBird.new();
  });

  it('Should construct the metadata', async () => {
    const name = await kryptoBird.name();
    const symbol = await kryptoBird.symbol();

    assert(nameState === name);
    assert(symbolState === symbol);
  });

  it('Should mint NFTs and emit Trasfer event', async () => {
    const response = await kryptoBird.mint('https....1');
    const { logs } = response;

    assert.ok(Array.isArray(logs));
    assert.equal(logs.length, 1);

    const log = logs[0];
    assert.equal(log.event, 'Transfer');
  });

  it('Should not mint NFTs with the same name', async () => {
    const name = 'https....1';
    let error = '';

    try {
      await kryptoBird.mint(name);
      await kryptoBird.mint(name);
    } catch (err) {
      error = err.reason;
    }

    assert.equal('Error - kryptoBird already exists', error);
  });
});
