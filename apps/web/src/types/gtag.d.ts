export {};

type ConsentStatus = "granted" | "denied";

interface ConsentParams {
  analytics_storage?: ConsentStatus;
  ad_storage?: ConsentStatus;
  ad_user_data?: ConsentStatus;
  ad_personalization?: ConsentStatus;
  functionality_storage?: ConsentStatus;
  security_storage?: ConsentStatus;
  wait_for_update?: number;
}

declare global {
  function gtag(
    command: "config",
    targetId: string,
    config?: Record<string, unknown>
  ): void;
  function gtag(
    command: "event",
    eventName: string,
    eventParams?: Record<string, unknown>
  ): void;
  function gtag(
    command: "consent",
    subcommand: "default" | "update",
    params: ConsentParams
  ): void;
  function gtag(command: string, ...args: unknown[]): void;

  interface Window {
    gtag: typeof gtag;
  }
}
