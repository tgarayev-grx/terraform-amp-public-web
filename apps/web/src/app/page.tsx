import { redirect } from "next/navigation";

export default function RootPage() {
  // Redirect the user to the default locale when `/` is requested
  redirect("/en");
}
