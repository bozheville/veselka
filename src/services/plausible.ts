export const plausible = (name: string, props?: any) => {
  if (typeof window !== 'undefined' && window?.plausible) {
    window.plausible(name, props);
  }
}
