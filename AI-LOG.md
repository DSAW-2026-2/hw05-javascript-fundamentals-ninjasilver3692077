# AI Log

## Did you use AI to write any function?

Yes. I used AI to help write a few individual functions after planning the interactions for the page.

- Prompt for the theme button: “Write a JavaScript function that changes a button label based on whether the page has the `dark` class.” The result was the `updateThemeButton` function.
- Prompt for the modal: “Write a JavaScript function to close an accessible modal, hide it, update `aria-hidden`, and return focus to its opening button.” The result was the `closeModal` function.
- Prompt for validation messages: “Write a small JavaScript function that displays an error message below an invalid form input and adds an error border.” The result was the `showFieldError` function.

I connected these functions to the page myself with `addEventListener` for clicks, typing, form submission, and the `Escape` key.

## What did you not understand immediately?

At first, I did not immediately understand why the modal uses both `hidden` and `flex` classes. `hidden` removes it from the layout, while `flex` centers the visible dialog.

## What did you change after testing and why?

After testing, I prevented the form from sending users to another page after a valid submission. Instead, it shows a success message so users can see that their registration was accepted. I also added accessible error messages so users can clearly identify invalid fields.
