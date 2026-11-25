/**
 * Przykładowe dane użytkownika testowego.
 * Lokalnie wartości są pobierane z pliku .env, a w CI/CD z GitHub Secrets.
 */
export const user = {
  email: process.env.TEST_USER_EMAIL!,
  password: process.env.TEST_USER_PASSWORD!,
};
