const errors: { [key: string]: string } = {
  "auth/invalid-email": "Email is not valid",
  "auth/user-not-found": "User not found",
  "auth/wrong-password": "Invalid credentials",
  "auth/email-already-in-use": "Email already in use. Please use another email",
  "auth/weak-password":
    "Password is too weak. Please use a minimum of 6 characters",
  "auth/too-many-requests": "Too many requests, try again later",
  "auth/network-request-failed": "Network error, try again later",
  "auth/user-disabled": "User is disabled",
  "auth/operation-not-allowed": "Operation not allowed",
  "auth/account-exists-with-different-credential":
    "Account exists with different credential",
  "auth/credential-already-in-use": "Credential already in use",
  "auth/popup-closed-by-user": "Popup closed by user",
  "auth/popup-blocked": "Popup blocked",
  "auth/invalid-credential": "Invalid credential",
  "auth/user-mismatch": "User mismatch",
  "auth/requires-recent-login": "Requires recent login",
  "auth/provider-already-linked": "Provider already linked",
  "auth/internal-error": "Something went wrong. Try again later",
  "auth/invalid-action-code": "Invalid action code",
};

export const firebaseError = (code: string) => {
  return errors[code] || code;
};
