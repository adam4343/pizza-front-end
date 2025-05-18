import ResetPasswordForm from "./_components/reset-pass-form";
import Link from "next/link";
import { Container } from "@/components/common/container";
import Image from "next/image";
import { Title } from "@/components/shared/title";
import { Suspense } from "react";

export default function ResetPassword() {
  return (
    <section>
      <Container>
        <div className="h-screen flex-col items-center flex justify-center">
          <div>
            <Link
              href={"/"}
              className="w-[70px] h-[70px] relative block mb-12 "
            >
              <Image fill src="/icon-logo.svg" alt="dodo pizza logo" />
            </Link>
          </div>

          <div className="mb-4 text-center">
            <Title
              size="xl"
              text="Reset your password"
              className="font-bold text-3xl mb-2"
            />

            <p className="font-bold text-lg">
              Create a new password for your account
            </p>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
