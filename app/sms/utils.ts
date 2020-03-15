export const stripPhoneNumber = (phoneNumber: string): string => {
  if (phoneNumber && phoneNumber.startsWith('+47')) {
    return phoneNumber.slice(3);
  }
  if (phoneNumber && phoneNumber.startsWith('0047')) {
    return phoneNumber.slice(4);
  }
  return phoneNumber;
};
