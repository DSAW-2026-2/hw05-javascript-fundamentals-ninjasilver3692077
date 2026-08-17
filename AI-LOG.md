# AI Log

## Did you use AI to write any function?

Yes. I used AI as a starting point for individual vanilla JavaScript functions, then connected, tested, and adjusted them manually.

### Theme button

**Prompt:** "Write a JavaScript function that changes a button label based on whether the page has the `dark` class."

The resulting approach became `updateThemeButton`, which updates both the visible label and `aria-pressed` value after the theme button toggles the `dark` class.

### Accessible modal

**Prompt:** "Write a JavaScript function to close an accessible modal, hide it, update `aria-hidden`, and return focus to its opening button."

The resulting approach became `closeModal`, which is used by the close button, a backdrop click, and the `Escape` keyboard shortcut.

### Real-time story filter

**Prompt:** "Using only vanilla JavaScript, create a real-time search filter for six article cards. It must update on every keystroke and show a message when there are no matches."

**Original AI suggestion:**

```js
const searchInput = document.getElementById("story-search");
const cards = document.querySelectorAll("[data-story]");

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    cards.forEach((card) => {
        card.hidden = !card.textContent.toLowerCase().includes(query);
    });
});
```

**Final implementation:**

```js
function updateStoryFilter() {
    const query = storySearch.value.trim().toLowerCase();
    let visibleStories = 0;

    storyCards.forEach((card) => {
        const matchesSearch = card.textContent.toLowerCase().includes(query);
        card.classList.toggle("hidden", !matchesSearch);

        if (matchesSearch) {
            visibleStories += 1;
        }
    });

    storyEmpty.classList.toggle("hidden", visibleStories !== 0);
    storyFilterStatus.textContent = query === ""
        ? `Showing all ${visibleStories} user stories.`
        : `Showing ${visibleStories} user stories for "${query}".`;
}
```

**Changes I made after reviewing the suggestion:** I used the existing Tailwind `hidden` utility instead of the `hidden` property, trimmed the search text, counted visible cards, added a visible empty-state message, and updated an `aria-live` status so screen-reader users receive the same filter result.

## What did you not understand immediately?

At first, I did not immediately understand why the modal uses both `hidden` and `flex` classes. `hidden` removes it from the layout, while `flex` centers the visible dialog. I also needed to review why the filter listens to `input`: unlike `change`, it runs after each keystroke, which is what makes the search real-time.

## What did you change after testing and why?

After testing, I prevented the form from navigating to another page after a valid submission and show a success message instead. I moved the validation to `js/validation.js` and added visible error messages for all four fields: full name, email, university, and challenge. I also added the empty-state and result count to the filter so users can understand what happened when no user stories match their search.
