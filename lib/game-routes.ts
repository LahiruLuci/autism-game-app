const GAME_ROUTE_ALIASES: Record<string, string> = {
  "situation-emotion-choice": "emotion-story-choice",
  "memory-card": "memory-match",
  "pattern-completion": "pattern-builder",
  "feeling-need-choice": "personal-choice-adventure",
  "count-objects": "count-the-objects",
  "number-match": "shape-number-match",
};

export function getCanonicalGameSlug(gameSlug: string) {
  return GAME_ROUTE_ALIASES[gameSlug] ?? gameSlug;
}

export function getGameSlugVariants(gameSlug: string) {
  const canonicalSlug = getCanonicalGameSlug(gameSlug);
  const aliases = Object.entries(GAME_ROUTE_ALIASES)
    .filter(([, routeSlug]) => routeSlug === canonicalSlug)
    .map(([alias]) => alias);

  return [canonicalSlug, ...aliases];
}

export function getGameHref(
  childId: string,
  gameSlug: string,
  level?: number,
) {
  const pathname = `/games/${childId}/${getCanonicalGameSlug(gameSlug)}`;
  return level === undefined ? pathname : `${pathname}?level=${level}`;
}
