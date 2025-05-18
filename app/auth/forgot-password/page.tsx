import { Container } from "@/components/common/container";
import Link from "next/link";
import { Title } from "@/components/shared/title";
import ForgotPasswordForm from "./_components/forgot-pass-form";
export default function ForgotPassword() {
  return (
    <section>
      <Container>
        <div className="h-screen flex-col items-center flex justify-center">

          <div className="mb-4 text-center">
            <Title
              size="xl"
              text="Forgot your password?"
              className="font-bold text-3xl mb-2"
            />

          </div>

          <ForgotPasswordForm />

          <div className="flex items-center gap-2 lg:max-w-[320px]">
            <p>Remembered your password?</p>

            <Link
              href={"/auth/login"}
              className="text-primary transition-all duration-300 ease-in-out hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
