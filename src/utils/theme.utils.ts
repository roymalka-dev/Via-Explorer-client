export function remToPx(value: string): number {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value: number): string {
  return `${value / 16}rem`;
}

// Define a type for the responsiveFontSizes parameter
type ResponsiveFontSizesProps = {
  sm: number;
  md: number;
  lg: number;
};

export function responsiveFontSizes({
  sm,
  md,
  lg,
}: ResponsiveFontSizesProps): Record<string, { fontSize: string }> {
  return {
    "@media (min-width:600px)": {
      fontSize: pxToRem(sm),
    },
    "@media (min-width:900px)": {
      fontSize: pxToRem(md),
    },
    "@media (min-width:1200px)": {
      fontSize: pxToRem(lg),
    },
  };
}
