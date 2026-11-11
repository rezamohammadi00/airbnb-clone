import { createAuthClient } from "better-auth/react";
import { phoneNumberClient } from "better-auth/client/plugins";

export const { signIn, signUp, useSession, phoneNumber } = createAuthClient({
  plugins: [phoneNumberClient()],
});
