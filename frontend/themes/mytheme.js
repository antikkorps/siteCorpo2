import { definePreset } from "@primeuix/themes"
import Aura from "@primeuix/themes/aura"

const MyPreset = definePreset(Aura, {
  semantic: {
    // primary: {
    //   50: "{gray.50}",
    //   100: "{gray.100}",
    //   200: "{gray.200}",
    //   300: "{gray.300}",
    //   400: "{gray.400}",
    //   500: "{gray.950}",
    //   600: "{gray.600}",
    //   700: "{gray.700}",
    //   800: "{gray.800}",
    //   900: "{gray.900}",
    //   950: "{gray.950}",
    // },

    primary: {
      50: "#f0f9ff", // Très clair basé sur #3A899D
      100: "#e0f2fe", // Clair basé sur #3A899D
      200: "#bae6fd", // Moyen clair basé sur #3A899D
      300: "#7dd3fc", // Moyen basé sur #3A899D
      400: "#38bdf8", // Moyen foncé basé sur #3A899D
      500: "#3A899D", // Votre bleu principal
      600: "#426F83", // Votre bleu-gris
      700: "#263443", // Votre bleu foncé
      800: "#1e293b", // Plus foncé basé sur #263443
      900: "#0f172a", // Très foncé basé sur #263443
      950: "#020617", // Presque noir basé sur #263443
    },
    success: {
      50: "#f0fdf4", // Très clair basé sur #8DAC3A
      100: "#dcfce7", // Clair basé sur #8DAC3A
      200: "#bbf7d0", // Moyen clair basé sur #8DAC3A
      300: "#86efac", // Moyen basé sur #8DAC3A
      400: "#4ade80", // Moyen foncé basé sur #8DAC3A
      500: "#8DAC3A", // Votre vert clair
      600: "#3C6634", // Votre vert foncé
      700: "#182918", // Votre vert très foncé
      800: "#14532d", // Plus foncé basé sur #3C6634
      900: "#052e16", // Très foncé basé sur #3C6634
      950: "#022c22", // Presque noir basé sur #182918
    },
    warning: {
      500: "#f59e0b", // Orange standard pour les warnings
      600: "#d97706",
      700: "#b45309",
    },
    error: {
      500: "#ef4444", // Rouge standard pour les erreurs
      600: "#dc2626",
      700: "#b91c1c",
    },
    info: {
      500: "#426F83", // Votre bleu-gris pour les infos
      600: "#263443",
      700: "#1e293b",
    },
  },
  global: {
    css: `
      :root {
        --primary-color: #3A899D;
        --primary-light: #426F83;
        --primary-dark: #263443;
        --success-color: #8DAC3A;
        --success-dark: #3C6634;
        --success-darker: #182918;
        --accent-color: #426F83;
      }
    `,
  },
})

export default {
  preset: MyPreset,
  options: {
    darkModeSelector: ".p-dark",
  },
}
