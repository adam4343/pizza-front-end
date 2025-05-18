import { Container } from "@/components/common/container";
import Link from "next/link";
import Image from "next/image";
import { Title } from "@/components/shared/title";
import LoginForm from "./_components/login-form";
import { Separator } from "@/components/ui";
import ButtonGoogle from "@/components/common/btn-google";

export default function Login() {
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
              text="Log in to your account "
              className="font-bold text-3xl mb-2"
            />

            <p className="font-bold text-lg">Discover the best pizzas!</p>
          </div>

          <div className="space-y-3 max-w-[320px] mb-4">
            <LoginForm />

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
                By signing in, you agree to the{" "}
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
            <p>Don’t have an account?</p>

            <Link
              href={"/auth/register"}
              className="text-primary transition-all duration-300 ease-in-out hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
