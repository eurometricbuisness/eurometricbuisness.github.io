// Only pages whose current content and calculations are ready for discovery.
export const primarySite = 'https://eurometricbuisness.github.io';
export const indexedTools = [
  'simulador-hipotecas',
  'prestamos-personales',
  'calculadora-tae',
  'interes-compuesto',
  'dividendos',
  'precio-medio-inversion',
  'calculadora-iva',
  'rentabilidad-alquiler',
  'calculadora-inflacion',
  'objetivos-de-ahorro',
] as const;
export const indexedCategories = [
  'hipotecas-y-prestamos',
  'inversiones',
  'impuestos-y-autonomos',
  'inmobiliaria-y-ahorro',
] as const;
export const shouldIndexTool = (slug: string) => (indexedTools as readonly string[]).includes(slug);
export const shouldIndexCategory = (slug: string) => (indexedCategories as readonly string[]).includes(slug);
