export {};

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
  function gtag(command: string, ...args: unknown[]): void;

  interface Window {
    gtag: typeof gtag;
  }
}
