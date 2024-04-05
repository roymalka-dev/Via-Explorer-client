import { LangOption } from "@/types/locale.types";

import israelFlag from "@/assets/icons/israel.png";
import usFlag from "@/assets/icons/united-states.png";
import italyFlag from "@/assets/icons/italy.png";
import spainFlag from "@/assets/icons/spain.png";
import germanyFlag from "@/assets/icons/germany.png";
import saudiFlag from "@/assets/icons/saudi.png";

export const languageOptions: LangOption[] = [
  { code: "en", name: "", icon: usFlag, alt: "US Flag" },
  { code: "he", name: "", icon: israelFlag, alt: "Israel Flag" },
  { code: "it", name: "", icon: italyFlag, alt: "Italy Flag" },
  { code: "sp", name: "", icon: spainFlag, alt: "Spain Flag" },
  { code: "de", name: "", icon: germanyFlag, alt: "Germany Flag" },
  { code: "ar", name: "", icon: saudiFlag, alt: "Saudi Flag" },
];
