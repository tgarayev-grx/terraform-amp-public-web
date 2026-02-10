import { redirect } from "@/modules/cross-cutting-concerns/i18n/navigation";

export default function RootPage() {
  // Redirect the user to the default locale when `/` is requested
  redirect({ href: "/", locale: "en" });
}
