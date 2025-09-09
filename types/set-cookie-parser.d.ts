declare module 'set-cookie-parser' {
  export interface Cookie {
    name: string;
    value: string;
    path?: string;
    domain?: string;
    expires?: Date;
    maxAge?: number;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
  }

  export interface CookieParseOptions {
    map?: boolean;
  }

  export function parse(
    input: string | string[],
    options?: CookieParseOptions & { map: true }
  ): Record<string, Cookie>;

  export function parse(
    input: string | string[],
    options?: CookieParseOptions & { map: false }
  ): Cookie[];

  export function splitCookiesString(cookiesString: string): string[];
}
