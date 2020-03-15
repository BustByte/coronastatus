import crypto from 'crypto';

const { PHONE_NUMBER_SALT } = require('../../config.json');

export const stripPhoneNumber = (phoneNumber: string): string => {
  if (phoneNumber && phoneNumber.startsWith('+47')) {
    return phoneNumber.slice(3);
  }
  if (phoneNumber && phoneNumber.startsWith('0047')) {
    return phoneNumber.slice(4);
  }
  return phoneNumber;
};

export const hashPhoneNumber = (phoneNumber: string): string => {
  const hmac = crypto.createHmac('sha256', PHONE_NUMBER_SALT);
  hmac.update(phoneNumber);
  return hmac.digest('hex');
};
