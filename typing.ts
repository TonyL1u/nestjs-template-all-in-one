import type { Request as OriginalRequest } from 'express';

declare module 'express' {
  interface Request extends OriginalRequest {
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
}
