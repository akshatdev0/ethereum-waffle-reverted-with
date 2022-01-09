const { expect, use } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { deployContract, MockProvider, solidity } = require('ethereum-waffle');
const Matchers = require('../build/Matchers.json');

use(chaiAsPromised);
use(solidity);

describe('Matchers: revertedWith', () => {
  const [wallet] = new MockProvider().getWallets();
  let matchers;

  beforeEach(async () => {
    matchers = await deployContract(wallet, Matchers);
  });

  it('Exact Message: PASSES', async () => {
    await expect(matchers.doRevert()).to.be.revertedWith('Revert cause');
  });

  it('Different Messages: FAILES', async () => {
    await expect(
      expect(matchers.doRevert()).to.be.revertedWith('Revert cause 1')
    ).to.be.eventually.rejected;
    await expect(
      expect(matchers.doRevert()).to.be.revertedWith('Different message')
    ).to.be.eventually.rejected;
  });

  it('Different Messages: Starting with same prefixes: FAILES', async () => {
    await expect(expect(matchers.doRevert()).to.be.revertedWith('R')).to.be
      .eventually.rejected;
    await expect(expect(matchers.doRevert()).to.be.revertedWith('Re')).to.be
      .eventually.rejected;
    await expect(expect(matchers.doRevert()).to.be.revertedWith('Rev')).to.be
      .eventually.rejected;
    await expect(expect(matchers.doRevert()).to.be.revertedWith('Reve')).to.be
      .eventually.rejected;
    await expect(expect(matchers.doRevert()).to.be.revertedWith('Rever')).to.be
      .eventually.rejected;
    await expect(expect(matchers.doRevert()).to.be.revertedWith('Revert caus'))
      .to.be.eventually.rejected;
  });
});
