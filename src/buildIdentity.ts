import {
  DelegationChain,
  DelegationIdentity,
  Ed25519KeyIdentity,
  isDelegationValid,
} from '@dfinity/identity';
import { compareUint8Arrays } from '@higayasuo/u8a-utils';

type BuildIdentityArgs = {
  appKey: Ed25519KeyIdentity;
  delegationChain: DelegationChain;
};

export const buildIdentity = async ({
  appKey,
  delegationChain,
}: BuildIdentityArgs): Promise<DelegationIdentity> => {
  if (!isDelegationValid(delegationChain)) {
    throw new Error('Delegation chain has expired. Please re-authenticate to get a new delegation.');
  }

  const delegations = delegationChain.delegations;
  const lastDelegation = delegations[delegations.length - 1];

  if (
    !compareUint8Arrays(
      new Uint8Array(lastDelegation.delegation.pubkey),
      new Uint8Array(appKey.getPublicKey().toDer()),
    )
  ) {
    throw new Error('Security Alert: The session key does not match the key authorized in the delegation chain. This could allow unauthorized access to your account. Please log out and log in again to establish a new, valid delegation chain.');
  }

  return DelegationIdentity.fromDelegation(appKey, delegationChain);
};
