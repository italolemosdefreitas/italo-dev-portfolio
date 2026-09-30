<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep copied Spell UI components under `src/components/spell/` and adapt them via semantic site tokens; this preserves their provenance and the portfolio's existing design system.
- Render the Spell UI Three.js rays only after client hydration and behind page content, on a stable small-viewport-height layer; WebGL cannot render during server-side output, and mobile browser chrome must not repeatedly resize its canvas while scrolling.
- Keep mobile navigation in an expandable fixed-header menu instead of a horizontally clipped link strip; it preserves readable links and stable header height on narrow screens.
