import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center w-screen h-screen text-white">
      <SignIn path="/sign-in" routing="path" afterSignInUrl="/" signUpUrl="/" />
    </div>
  );
}
