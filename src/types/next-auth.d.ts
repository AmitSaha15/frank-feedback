import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      isAcceptingMsg?: boolean;
      username?: string;
    } & DefaultSessios['user'];
  }

  interface User {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMsg?: boolean;
    username?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMsg?: boolean;
    username?: string;
  }
}