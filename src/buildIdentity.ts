import {
  DelegationChain,
  DelegationIdentity,
  Ed25519KeyIdentity,
  isDelegationValid,
} from '@dfinity/identity';
import { compareUint8Arrays } from '@higayasuo/u8a-utils';
import { AuthenticationExpiredError, SessionKeyMismatchError } from './errors/identityErrors';

type BuildIdentityArgs = {
  appKey: Ed25519KeyIdentity;
  delegationChain: DelegationChain;
};

export const buildIdentity = async ({
  appKey,
  delegationChain,
}: BuildIdentityArgs): Promise<DelegationIdentity> => {
  if (!isDelegationValid(delegationChain)) {
    throw new AuthenticationExpiredError();
  }

  const delegations = delegationChain.delegations;
  const lastDelegation = delegations[delegations.length - 1];

  if (
    !compareUint8Arrays(
      new Uint8Array(lastDelegation.delegation.pubkey),
      new Uint8Array(appKey.getPublicKey().toDer()),
    )
  ) {
    throw new SessionKeyMismatchError();
  }

  return DelegationIdentity.fromDelegation(appKey, delegationChain);
};
