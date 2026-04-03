# Design System Specification: The Breathable Clinical Experience

## 1. Overview & Creative North Star
**Creative North Star: "Clinical Serenity"**
Traditional dental design often feels sterile, cold, or overly clinical. This design system rejects the "grid-of-boxes" approach in favor of an editorial, high-end experience that feels more like a wellness retreat than a medical office. We achieve this through **Organic Asymmetry** and **Tonal Depth**. By utilizing large, airy layouts and overlapping soft-edged containers, we create a sense of approachability and modern luxury. The goal is to reduce patient anxiety through visual "breathing room" and sophisticated typography.

## 2. Color & Surface Philosophy
The palette moves beyond basic turquoise and white, introducing a spectrum of "Teal-Greys" and "Warm Snows" to create a professional, layered environment.

### The "No-Line" Rule
**Explicit Instruction:** Prohibit the use of 1px solid borders for sectioning or containment. Boundaries must be defined solely through background color shifts. Use `surface-container-low` for large section backgrounds and `surface-container-lowest` (#ffffff) for foreground interactive elements. 

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of frosted glass.
*   **Base Layer:** `surface` (#f5fafa) for the primary application background.
*   **Secondary Layer:** `surface-container-low` (#eff5f5) for grouping related content (e.g., a "Services" section).
*   **Interactive Layer:** `surface-container-lowest` (#ffffff) for cards or inputs that require the most attention.

### The "Glass & Gradient" Rule
To elevate the "Turquoise" identity, do not use flat hex codes for large hero areas. Utilize a **Signature Gradient**:
*   **Direction:** 135-degree linear.
*   **Values:** From `primary` (#006a66) to `primary_container` (#00bbb4).
*   **Glassmorphism:** For floating navigation bars or appointment modals, use `surface` at 80% opacity with a `24px` backdrop-blur. This ensures the dental imagery or brand colors "bleed" through softly, softening the clinical edge.

## 3. Typography
The type system balances the authority of a medical professional with the warmth of a neighbor.

*   **The Hero (Display & Headline):** *Plus Jakarta Sans*. A modern, soft geometric sans-serif. Use `display-lg` for value propositions. The wide apertures and friendly curves make "Dental Surgery" feel like "Smile Care."
*   **The Narrative (Body & Title):** *Be Vietnam Pro*. Selected for its exceptional legibility and slightly humanist touch. 
*   **Visual Hierarchy:**
    *   **Editorial Contrast:** Pair a `display-md` headline (Primary #006a66) with a `body-lg` paragraph (On-Surface-Variant #3c4948). The high contrast in size and subtle shift in color creates a premium, intentional feel.

## 4. Elevation & Depth
In this design system, shadows are atmospheric, not structural.

*   **Tonal Layering:** Avoid shadows for static cards. Instead, place a `#ffffff` card on a `surface-container-low` (#eff5f5) background. This creates a "Natural Lift" that feels cleaner than a drop shadow.
*   **Ambient Shadows:** For floating elements (Modals, Hovering CTAs), use a multi-layered shadow:
    *   `box-shadow: 0 10px 40px -10px rgba(0, 106, 102, 0.08);`
    *   Notice the tint: The shadow is a desaturated version of our `primary` color, making the object feel like it belongs in the environment rather than hovering over a grey void.
*   **The Ghost Border Fallback:** If a form field or element requires a boundary for accessibility, use `outline-variant` (#bbc9c7) at **15% opacity**. It should be felt, not seen.

## 5. Components

### Buttons: The "Pill" Standard
*   **Primary:** Background: `primary` (#006a66); Text: `on_primary` (#ffffff). Border Radius: `full` (9999px). 
*   **Secondary:** Background: `secondary_container` (#baece8); Text: `on_secondary_container` (#3d6c69).
*   **Behavior:** On hover, use a slight vertical lift (-2px) and an increase in shadow spread. Avoid color shifts; use physical movement to signal interactivity.

### Cards & Appointment Items
*   **No Dividers:** Forbid the use of `<hr>` or border-bottom lines. 
*   **The Gutter Rule:** Use `spacing-xl` (3rem) between content blocks. Let the negative space guide the eye. Use a change to `surface-container-high` (#e4e9e9) to denote a different content type (e.g., a "Patient Review" block).

### Form Inputs
*   **Style:** `surface-container-lowest` (#ffffff) background with a `sm` (0.5rem) rounded corner. 
*   **Focus State:** Do not use a heavy outline. Use a 2px "Ghost Border" of `primary` at 40% and a subtle glow using the Ambient Shadow spec.

### Suggested Signature Component: The "Peace of Mind" Progress Bar
For multi-step appointment booking, use a soft, thick (8px) bar with `rounded-full` corners. Use `primary_fixed` (#6bf8f0) for the track and `primary` (#006a66) for the progress, creating a calming, water-like visual.

## 6. Do's and Don'ts

### Do:
*   **Do** use intentional asymmetry. Place a high-quality medical photo overlapping the edge of a `surface-container` to create a custom, high-end feel.
*   **Do** use `tertiary` (#9a451b) sparingly for "Warning" or "Urgent" states (like "Last Slot Available") as its warmth complements turquoise without looking like a "Stop" sign.
*   **Do** prioritize white space. If you think there is enough space, add 16px more.

### Don't:
*   **Don't** use pure black (#000000) for text. Use `on_background` (#171d1d) to maintain the soft, welcoming tone.
*   **Don't** use sharp corners. The minimum radius allowed is `sm` (0.5rem), but `DEFAULT` (1rem) is preferred for most containers.
*   **Don't** use standard "Success Green." Use the `primary` turquoise scale to communicate health and positivity.