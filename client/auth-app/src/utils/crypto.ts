/**
 * Utility functions for client-side cryptography
 */

/**
 * Hash a password client-side before sending to the server
 * This adds an extra layer of security by not sending raw passwords over the network
 *
 * @param password The raw password to hash
 * @returns A promise that resolves to the hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  // Convert the password string to an ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  // Generate a SHA-256 hash of the password
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  // Convert the hash to a hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return hashHex;
}
