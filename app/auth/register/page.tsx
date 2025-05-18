import { Container } from "@/components/common/container";
import { Separator } from "@/components/ui";
import { Title } from "@/components/shared/title";
import Link from "next/link";
import Image from "next/image";
import RegisterDialog from "./_components/register-dialog";
import ButtonGoogle from "@/components/common/btn-google";

export default function Register() {
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
              text="Create your account "
              className="font-bold text-3xl mb-2"
            />

            <p className="font-bold text-lg">
              Join and discover the best pizzas!
            </p>
          </div>

          <div className="space-y-3 max-w-[320px] mb-4">
            <RegisterDialog />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>

              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <div className="space-y-2">
             <ButtonGoogle />

              <p className="text-xs text-muted-foreground">
                By signing up, you agree to the{" "}
                <Link
                  href={"/legal/terms"}
                  className="text-primary transition-all duration-300 ease-in-out hover:underline "
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href={"/legal/terms"}
                  className="text-primary transition-all duration-300 ease-in-out hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:max-w-[320px]">
            <p>Already have an account?</p>

            <Link
              href={"/auth/login"}
              className="text-primary transition-all duration-300 ease-in-out hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
