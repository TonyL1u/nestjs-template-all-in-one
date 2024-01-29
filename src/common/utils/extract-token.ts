import type { Request } from 'express';

export function extractToken(request: Request, options?: { source: 'header' | 'url' | 'cookie' }): string | undefined {
  const { source = 'cookie' } = options || {};

  switch (source) {
    case 'cookie':
      const { AccessToken } = request.cookies ?? {};

      return AccessToken || undefined;
    case 'header':
      const [type, token] = request.headers.authorization?.split(' ') ?? [];

      return type === 'Bearer' ? token : undefined;
    case 'url':
      const domain = request.hostname.split('.');

      return domain.length >= 2 ? (domain[0] === 'www' ? undefined : domain[0]) : undefined;
  }
}
