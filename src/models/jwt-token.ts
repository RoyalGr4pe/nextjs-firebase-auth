import { JWT } from "next-auth/jwt";

interface IJwtToken extends JWT {
	id: string;
	email: string;
}


export type { IJwtToken }