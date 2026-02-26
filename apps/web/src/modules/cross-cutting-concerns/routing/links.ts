const PAY_BASE_URL = "https://merchant-front-pay.goldenratio.exchange";

export const EXTERNAL_LINKS = {
  Pay: {
    signIn: new URL("/sign-in", PAY_BASE_URL),
    signUp: new URL("/sign-up", PAY_BASE_URL),
  },
};
