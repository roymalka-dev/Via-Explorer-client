import logoPng from "@/assets/images/Via_logo_cut.png"; // Update the path to your PNG image

export const PngIcon = ({ size = 30 }) => (
  <img
    src={logoPng}
    alt="Custom Icon"
    width={size}
    height={size}
    style={{ verticalAlign: "middle" }}
  />
);
