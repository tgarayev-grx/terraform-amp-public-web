/**
 * Lightweight commit message checks. The old setup used @commitlint/config-conventional,
 * which rejects any message that is not like `type(scope): subject` — easy to trip over,
 * especially from GUI clients that add footers or omit the type prefix.
 *
 * To enforce Conventional Commits again, restore:
 *   extends: ['@commitlint/config-conventional'],
 * and remove the custom `rules` below (or tighten selectively).
 */
module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: /^(.+)$/,
      headerCorrespondence: ["subject"],
    },
  },
  rules: {
    "subject-empty": [2, "never"],
    "header-max-length": [2, "always", 240],
  },
};
