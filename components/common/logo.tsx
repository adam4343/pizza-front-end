import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string; 
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-4", className)}>
      <div className=" w-12 h-12 lg:w-9 lg:h-9 relative flex-shrink-0">
        <Image fill src="/icon-logo.svg" alt="dodo pizza logo" />
      </div>

      <div>
        <span className="text-base hidden lg:block lg:text-2xl whitespace-nowrap tracking-[0.24px] font-black uppercase">
          Dodo Pizza
        </span>

        <p className="text-muted-foreground hidden lg:block">Can&apos;t be any tastier</p>
      </div>
    </Link>
  );
}
