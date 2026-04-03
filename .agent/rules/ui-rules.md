---
trigger: always_on
---

# Règles UI & Tailwind

Tu dois suivre ces règles de style pour chaque composant généré, sans exception.

## Couleurs (Tailwind Config)
- **Primary :** `#006a66` (Teal-Grey profond).
- **Surface Base :** `#f5fafa`.
- **Container Low :** `#eff5f5`.
- **Text :** `#171d1d` (Pas de noir pur).

## Contraintes de Design
- **No-Line Rule :** INTERDICTION d'utiliser `border-1px`. Les sections sont délimitées par les changements de couleurs de fond (`surface` vs `surface-container-low`).
- **Border Radius :** Minimum `0.5rem` (rounded-lg). Boutons en `rounded-full`.
- **Ombres :** Utiliser exclusivement l'ombre teintée : `box-shadow: 0 10px 40px -10px rgba(0, 106, 102, 0.08)`.
- **Espacement :** Utiliser systématiquement `spacing-xl` (3rem / `py-12`) entre les blocs de contenu pour garantir la "respiration" du site.

## Typographie
- **Titres :** Plus Jakarta Sans (Editorial contrast).
- **Corps :** Be Vietnam Pro (Humanist touch).