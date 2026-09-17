import { useState } from 'react';
import { submitSignup } from '../lib/newsletter';

export type SignupStatus = 'idle' | 'sending' | 'success' | 'invalid' | 'error';

export const SIGNUP_MESSAGES: Record<Exclude<SignupStatus, 'idle' | 'sending'>, string> = {
  success: 'You’re on the list.',
  invalid: 'That email doesn’t look right.',
  error: 'Something went wrong. Please try again.',
};

/**
 * Shared state machine behind every newsletter form on the site.
 * `source` is recorded in the sheet so we can tell the forms apart.
 */
export function useNewsletterSignup(source: string) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SignupStatus>('idle');
  // Honeypot: hidden from people, filled in by bots.
  const [botcheck, setBotcheck] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    const result = await submitSignup(email, source, botcheck);
    setStatus(result);

    if (result === 'success') setEmail('');
  };

  const updateEmail = (value: string) => {
    setEmail(value);
    // Clear a stale result once the visitor starts correcting their input.
    setStatus((prev) => (prev === 'idle' || prev === 'sending' ? prev : 'idle'));
  };

  return {
    email,
    updateEmail,
    status,
    sending: status === 'sending',
    message: status === 'idle' || status === 'sending' ? null : SIGNUP_MESSAGES[status],
    botcheck,
    setBotcheck,
    submit,
  };
}
