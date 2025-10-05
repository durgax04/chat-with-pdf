import { Session } from "next-auth";

export interface HeroProps {
  session: Session | null;
}

export interface NavbarProps {
  session: Session | null;
}
