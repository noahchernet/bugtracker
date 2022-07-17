/**
  Takes in email and hides the email provider for privacy
 */
export default function nameFromEmail(email) {
  return email[0].toUpperCase() + email.slice(1, email.indexOf("@"));
}
