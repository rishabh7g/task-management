import { ButtonVariant } from "src/components/button/common/types/Button.types";

export const BASE_STYLES = "px-4 py-2 rounded text-white";
export const VARIANT_STYLES = {
  [ButtonVariant.Primary]: "bg-blue-500 hover:bg-blue-600",
  [ButtonVariant.Secondary]:
    "bg-white border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
  [ButtonVariant.Tertiary]:
    "px-0 py-1 bg-white text-blue-500 hover:underline hover:underline-offset-4",
};
