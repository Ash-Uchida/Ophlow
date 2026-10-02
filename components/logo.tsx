import Image from "next/image";

export function Logo() {
  return <Image src="/logo.svg" alt="Ophlow" width={144} height={40} className="h-10 w-36 object-cover object-center" />;
}
