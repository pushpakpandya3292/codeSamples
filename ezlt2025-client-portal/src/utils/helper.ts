export const formatPhoneNumber = (phoneNumber: string) => {
    // Remove all non-digit characters from the phone number
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");

    // Check if the cleaned phone number is in the format +1234567890
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[2]}) ${match[3]}-${match[4]}`;
    }
    return phoneNumber;
};