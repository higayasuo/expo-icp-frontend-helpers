import { describe, it, expect } from 'vitest';
import {
  DelegationChain,
  DelegationIdentity,
  Ed25519KeyIdentity,
  ECDSAKeyIdentity,
} from '@dfinity/identity';
import { buildIdentity } from '../buildIdentity';

describe('buildIdentity', () => {
  it('should build identity from valid delegation', async () => {
    // Create test app key
    const appKey = Ed25519KeyIdentity.generate();

    // Create test delegation chain
    const delegationKey = Ed25519KeyIdentity.generate();
    const delegationChain = await DelegationChain.create(
      delegationKey,
      appKey.getPublicKey(),
      new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
    );

    const identity = await buildIdentity({
      appKey,
      delegationChain,
    });

    expect(identity).toBeInstanceOf(DelegationIdentity);
  });

  it('should throw error when public keys do not match', async () => {
    // Create app key and a different key for delegation
    const appKey = Ed25519KeyIdentity.generate();
    const differentKey = await ECDSAKeyIdentity.generate();

    // Create delegation chain with different key's public key
    const delegationKey = Ed25519KeyIdentity.generate();
    const delegationChain = await DelegationChain.create(
      delegationKey,
      differentKey.getPublicKey(),
      new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
    );

    await expect(
      buildIdentity({
        appKey,
        delegationChain,
      }),
    ).rejects.toThrow('Security Alert: The session key does not match the key authorized in the delegation chain');
  });

  it('should throw error when delegation is expired', async () => {
    const appKey = Ed25519KeyIdentity.generate();
    const delegationKey = Ed25519KeyIdentity.generate();
    const delegationChain = await DelegationChain.create(
      delegationKey,
      appKey.getPublicKey(),
      new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    );

    await expect(
      buildIdentity({
        appKey,
        delegationChain,
      }),
    ).rejects.toThrow('Authentication has expired. Please log in again.');
  });
});
