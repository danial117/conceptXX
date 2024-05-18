// utils.js

export function generateId() {
    // Generate a random buffer of 16 bytes
    const buffer = new Uint8Array(16);
    window.crypto.getRandomValues(buffer);
  
    // Convert buffer to a hexadecimal string and format it
    const hexString = Array.from(buffer)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  
    // Insert dashes to match the typical UUID format
    return [
      hexString.slice(0, 8),
      hexString.slice(8, 12),
      hexString.slice(12, 16),
      hexString.slice(16, 20),
      hexString.slice(20, 32)
    ].join('-');
  }
  