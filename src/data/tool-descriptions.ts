import type { tools } from './tools';

type ToolSlug = (typeof tools)[number]['slug'];
type Description = { purpose: string; instructions: string; interpretation: string };

export const toolDescriptions: Record<ToolSlug, Description> = {
  'sueldo-bruto-a-neto': {
    purpose: 'Esta herramienta te ayuda a estimar cuánto quedaría de tu salario bruto después de aplicar la retención y las cotizaciones que indiques.',
    instructions: 'Introduce el sueldo bruto anual, los porcentajes de IRPF y cotización de tu nómina y el número de pagas.',
    interpretation: 'Verás una estimación anual y por paga. El cálculo aplica los porcentajes al sueldo bruto y no determina automáticamente las bases, los topes ni la retención que corresponde a tu situación.'
  },
  'indemnizacion-por-despido': {
    purpose: 'Calcula una indemnización bruta orientativa por despido objetivo o declarado improcedente según las reglas generales previstas para cada caso.',
    instructions: 'Indica el salario bruto anual regulador, el tipo de despido y los meses computables anteriores y posteriores al 12 de febrero de 2012.',
    interpretation: 'El resultado aplica los días de salario y límites generales correspondientes. La antigüedad computable, la calificación del despido y otras circunstancias pueden requerir una revisión profesional.'
  },
  'finiquito': {
    purpose: 'El finiquito reúne las cantidades pendientes al finalizar una relación laboral. Esta calculadora te permite sumar los importes que ya conoces.',
    instructions: 'Introduce el salario pendiente, las vacaciones y pagas extra pendientes, otros importes y las deducciones que correspondan.',
    interpretation: 'La herramienta suma los conceptos y resta las deducciones indicadas. No calcula por sí sola los días devengados, las retenciones ni una posible indemnización.'
  },
  'simulador-hipotecas': {
    purpose: 'Simula la cuota mensual de una hipoteca de tipo fijo para valorar cómo influyen el capital, el interés y el plazo.',
    instructions: 'Introduce el capital prestado, el tipo de interés nominal anual y la duración en meses.',
    interpretation: 'Obtendrás la cuota, el total pagado y los intereses estimados mediante cuotas constantes. La simulación no incluye seguros, comisiones, impuestos ni cambios del tipo de interés.'
  },
  'prestamos-personales': {
    purpose: 'Estima la cuota de un préstamo personal y el coste de sus intereses durante el plazo elegido.',
    instructions: 'Introduce el capital prestado, el interés nominal anual fijo y el número de meses de devolución.',
    interpretation: 'Los resultados suponen cuotas mensuales constantes. Compara también las comisiones y otros gastos de la oferta, que no están incluidos en este cálculo.'
  },
  'calculadora-tae': {
    purpose: 'La TAE orientativa resume el coste anual equivalente de un préstamo bajo los flujos y gastos incluidos, lo que ayuda a comparar ofertas.',
    instructions: 'Introduce el capital, el tipo nominal anual, el plazo y los gastos iniciales y mensuales incluidos en la operación.',
    interpretation: 'Se supone una cuota mensual constante y gastos regulares. Otros costes, fechas de pago distintas o reglas aplicables al contrato pueden hacer que la TAE contractual sea diferente.'
  },
  'interes-compuesto': {
    purpose: 'Explora cómo pueden evolucionar un capital inicial y tus aportaciones cuando los rendimientos se reinvierten a lo largo del tiempo.',
    instructions: 'Introduce el capital inicial, la aportación mensual, una rentabilidad nominal anual supuesta y el número de años.',
    interpretation: 'El resultado muestra el capital final, lo aportado y el rendimiento estimado con una tasa constante y capitalización mensual. No incluye pérdidas, impuestos ni comisiones y no garantiza rentabilidades futuras.'
  },
  'dividendos': {
    purpose: 'Estima los dividendos anuales de una cartera a partir del número de acciones y del dividendo bruto por acción.',
    instructions: 'Introduce el número de acciones, el dividendo bruto anual por acción y el porcentaje de retención que quieras aplicar.',
    interpretation: 'Verás el importe bruto, la retención estimada y el importe después de esa retención. El dividendo puede cambiar y el resultado no determina tu tributación definitiva.'
  },
  'precio-medio-inversion': {
    purpose: 'Calcula el coste medio por unidad de una inversión realizada en dos compras a precios o cantidades diferentes.',
    instructions: 'Introduce las unidades y el precio unitario de cada compra, junto con las comisiones totales.',
    interpretation: 'El precio medio pondera cada compra por sus unidades e incluye las comisiones indicadas. No tiene en cuenta ventas, impuestos ni cambios de moneda.'
  },
  'calculadora-irpf': {
    purpose: 'Calcula una aproximación a la cuota aplicando a la renta un tipo medio efectivo que ya conozcas o hayas estimado.',
    instructions: 'Introduce la renta anual sujeta estimada, el tipo medio efectivo y las retenciones ya practicadas.',
    interpretation: 'La diferencia compara la cuota estimada con las retenciones indicadas. La herramienta no calcula los tramos, mínimos personales, deducciones ni la declaración oficial; el tipo de retención no equivale necesariamente al tipo efectivo final.'
  },
  'cuota-autonomos': {
    purpose: 'Estima la cuota de autónomos de 2026 usando la base mínima del tramo correspondiente al rendimiento neto mensual computable.',
    instructions: 'Introduce el rendimiento neto mensual calculado conforme a las reglas de la Seguridad Social.',
    interpretation: 'Verás la base mínima y máxima del tramo y la cuota estimada sobre la base mínima para el régimen ordinario. La cuota reducida, las bonificaciones, la base elegida y las regularizaciones pueden cambiar el importe real.'
  },
  'calculadora-iva': {
    purpose: 'Calcula el IVA de una cantidad, tanto si introduces una base imponible como si partes de un precio con IVA incluido.',
    instructions: 'Indica el importe, el tipo de IVA aplicable y si la cantidad ya incluye el impuesto.',
    interpretation: 'La herramienta desglosa base, cuota de IVA y total. Debes elegir el tipo que corresponda a la operación y tener en cuenta las posibles exenciones u otras particularidades.'
  },
  'rentabilidad-alquiler': {
    purpose: 'Estima la rentabilidad anual de una vivienda en alquiler relacionando sus ingresos y gastos con la inversión inicial.',
    instructions: 'Introduce el precio de compra, los gastos de compra, el alquiler mensual, los gastos anuales y los meses previstos sin inquilino.',
    interpretation: 'Se muestran la rentabilidad bruta y la neta antes de impuestos, además de los ingresos y el resultado anual. El cálculo no contempla financiación, revalorización ni gastos que no hayas introducido.'
  },
  'calculadora-inflacion': {
    purpose: 'Explora cómo una subida sostenida de precios puede afectar al poder adquisitivo de una cantidad de dinero.',
    instructions: 'Introduce el importe actual, una inflación anual supuesta y el número de años.',
    interpretation: 'La herramienta muestra el poder adquisitivo futuro expresado en euros de hoy, el importe futuro equivalente y la subida acumulada. La inflación constante es una hipótesis, no una previsión.'
  },
  'objetivos-de-ahorro': {
    purpose: 'Calcula cuánto necesitas ahorrar cada mes para alcanzar una meta en el plazo que elijas.',
    instructions: 'Introduce la cantidad que quieres alcanzar, el ahorro que ya tienes y el número de meses disponibles.',
    interpretation: 'La aportación mensual divide el importe pendiente entre los meses indicados. No considera intereses ni comisiones; si ya has alcanzado la meta, la aportación necesaria es cero.'
  }
};
