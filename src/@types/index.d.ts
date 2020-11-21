export type SizeType = "sm" | "md" | "lg";

declare global {
  /**
   * Interface
   * **/
  interface Window {
    gtag?: (key: string, trackingId: string, config: { page_path: string }) => void;
  }

  interface DictionaryLike<T = unknown> extends Record<string, unknown> {
    [key: string]: T;
  }

  interface URLSearchParams {
    entries(): IterableIterator<[string, string]>;
  }

  interface Action {
    type: string;
    payload?: unknown;
  }

  /**
   * TypeAlias
   * **/
  type ThemeColor =
    | "primary"
    | "secondary"
    | "danger"
    | "disable"
    | "line"
    | "black"
    | "darkGray"
    | "mediumGray"
    | "lightGray"
    | "white";

  type SizeType = "sm" | "md" | "lg";

  type Maybe<T> = T | null;
  type Optional<T> = Maybe<T>;

  /**
   * GraphQL
   * **/
  type ConnectionInput = {
    first?: number;
    after?: string;
    last?: number;
    before?: string;
  };

  type PageInfo = {
    hasPreviousPage: boolean;
    startCursor?: string | null;
    hasNextPage: boolean;
    endCursor?: string | null;
  };

  interface Edge<T extends Node> {
    readonly node?: Maybe<T>;
    readonly cursor?: string;
  }

  interface Connection<T> {
    readonly edges?: Maybe<Array<Maybe<Edge<T>>>>;
    readonly pageInfo?: PageInfo;
  }
}
