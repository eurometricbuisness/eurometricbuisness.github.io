export const categories = [
  { slug: 'sueldos-y-empleo', name: 'Sueldos y empleo', description: 'Entiende mejor tu nómina y tus derechos laborales.', icon: 'BriefcaseBusiness' },
  { slug: 'hipotecas-y-prestamos', name: 'Hipotecas y préstamos', description: 'Planifica la financiación de tus proyectos.', icon: 'House' },
  { slug: 'inversiones', name: 'Inversiones', description: 'Explora el potencial de tus inversiones.', icon: 'ChartNoAxesCombined' },
  { slug: 'impuestos-y-autonomos', name: 'Impuestos y autónomos', description: 'Pon en contexto tus obligaciones fiscales.', icon: 'ReceiptText' },
  { slug: 'inmobiliaria-y-ahorro', name: 'Inmobiliaria y ahorro', description: 'Toma decisiones para tus objetivos a largo plazo.', icon: 'PiggyBank' },
] as const;

export const tools = [
  { slug: 'sueldo-bruto-a-neto', name: 'Sueldo bruto a neto', description: 'Estima cuánto podrías recibir a partir de tu sueldo bruto.', category: 'sueldos-y-empleo', icon: 'Wallet', popular: true },
  { slug: 'indemnizacion-por-despido', name: 'Indemnización por despido', description: 'Conoce los factores que intervienen en una indemnización.', category: 'sueldos-y-empleo', icon: 'BriefcaseBusiness' },
  { slug: 'finiquito', name: 'Calculadora de finiquito', description: 'Revisa los conceptos pendientes al finalizar una relación laboral.', category: 'sueldos-y-empleo', icon: 'FileText', popular: true },
  { slug: 'simulador-hipotecas', name: 'Simulador de hipotecas', description: 'Explora los elementos que determinan la cuota de tu hipoteca.', category: 'hipotecas-y-prestamos', icon: 'House', popular: true },
  { slug: 'prestamos-personales', name: 'Préstamos personales', description: 'Comprende los costes de financiar tus proyectos.', category: 'hipotecas-y-prestamos', icon: 'Landmark' },
  { slug: 'calculadora-tae', name: 'Calculadora de TAE', description: 'Conoce el indicador que facilita comparar financiación.', category: 'hipotecas-y-prestamos', icon: 'Percent' },
  { slug: 'interes-compuesto', name: 'Interés compuesto', description: 'Descubre cómo influye el tiempo en tu inversión.', category: 'inversiones', icon: 'TrendingUp', popular: true },
  { slug: 'dividendos', name: 'Calculadora de dividendos', description: 'Analiza los elementos de una inversión por dividendos.', category: 'inversiones', icon: 'Coins' },
  { slug: 'precio-medio-inversion', name: 'Precio medio de inversión', description: 'Entiende el coste medio de varias compras.', category: 'inversiones', icon: 'ChartNoAxesCombined' },
  { slug: 'calculadora-irpf', name: 'Calculadora de IRPF', description: 'Conoce los factores que influyen en el impuesto sobre la renta.', category: 'impuestos-y-autonomos', icon: 'FileSpreadsheet' },
  { slug: 'cuota-autonomos', name: 'Cuota de autónomos', description: 'Explora los factores que intervienen en tu cotización.', category: 'impuestos-y-autonomos', icon: 'Briefcase' },
  { slug: 'calculadora-iva', name: 'Calculadora de IVA', description: 'Comprende cómo se aplica el IVA a un importe.', category: 'impuestos-y-autonomos', icon: 'ReceiptText', popular: true },
  { slug: 'rentabilidad-alquiler', name: 'Rentabilidad de alquiler', description: 'Identifica ingresos y costes de una vivienda en alquiler.', category: 'inmobiliaria-y-ahorro', icon: 'KeyRound' },
  { slug: 'calculadora-inflacion', name: 'Calculadora de inflación', description: 'Entiende el efecto de los precios en tu poder adquisitivo.', category: 'inmobiliaria-y-ahorro', icon: 'ChartColumnIncreasing' },
  { slug: 'objetivos-de-ahorro', name: 'Objetivos de ahorro', description: 'Planifica los pasos hacia una meta de ahorro.', category: 'inmobiliaria-y-ahorro', icon: 'PiggyBank', popular: true },
] as const;
