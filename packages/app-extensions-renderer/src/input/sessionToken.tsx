import {useExtensionInput} from './utils';

export interface SessionToken {
  getSessionToken: () => Promise<string | undefined>;
}

export interface SessionTokenInput {
  sessionToken: SessionToken;
}

function isSessionTokenInput(input: any): input is SessionTokenInput {
  return 'sessionToken' in input;
}

export function useSessionToken() {
  const input = useExtensionInput();
  if (!isSessionTokenInput(input)) {
    throw new Error('No sessionToken input found');
  }
  return input.sessionToken;
}
