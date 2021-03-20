export function padding(str: string, pad: string, length: number) {
  const padStr = new Array(length).fill(pad.substr(0, 1)).join("");
  return `${padStr}${str}`.substr(0, length);
}

export function QueryString(obj: Record<string, unknown>) {
  return Object.keys(obj)
    .filter((key) => obj[key] != null)
    .map((key) => `${key}=${encodeURIComponent(`${obj[key]}`)}`)
    .join("&");
}
