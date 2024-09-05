export const main = {
    backgroundColor: "#19203A",
    textAlign: "center" as const,
    fontFamily: "Karla, Verdana, sans-serif",
    padding: "40px 0",
} as const;

export const container = {
    backgroundColor: "#242E47",
    margin: "40px auto",
    padding: "40px",
    maxWidth: "500px",
    borderRadius: "16px",
} as const;

export const button = {
    background: `linear-gradient(
      205.08deg,
      #1be4ae -44.68%,
      #ca32f7 151.84%
  )`,
    borderRadius: "5px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    width: "90%",
    margin: "auto",
    padding: "12px 8px",
} as const;

export const box = {} as const;

export const img = { borderRadius: "8px" } as const;

export const heading = {
    fontSize: "30px",
    fontWeight: 800,
    lineHeight: "36px",
} as const;

export const paragraph = {
    color: "#ffffff",
    fontSize: "18px",
    fontWeight: "normal",
    margin: "2px 0",
} as const;

export const footer = {
    color: "#718096",
    fontSize: "16px",
    lineHeight: "normal",
} as const;

export const sectionWithCenterItems = {
    textAlign: "center" as const,
    verticalAlign: "middle" as const,
};
