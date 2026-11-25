const euro = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
const number = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 4 });
const f = (key, label, unit = '€', max = 1000000000, min = 0, step = 'any') => ({ key, label, unit, max, min, step });
const money = (label, value) => ({ label, value, format: 'money' });
const pct = (label, value) => ({ label, value, format: 'percent' });
const qty = (label, value) => ({ label, value, format: 'number' });
const mortgageSource = 'https://clientebancario.bde.es/pcb/es/menu-horizontal/productosservici/financiacion/prestamopersonal/guia-textual/conceptocaracter/Cuota.html';
const vatSource = 'https://sede.agenciatributaria.gob.es/Sede/iva/calculo-iva-repercutido-clientes/tipos-impositivos-iva.html';
const contributionSource = 'https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/CotizacionRecaudacionTrabajadores/10721/10724/1320/1322/base%2Bde%2Bcotizacion';
const loan = (p, annual, months) => { const r = annual / 1200; return r === 0 ? p / months : p * r / -Math.expm1(-months * Math.log1p(r)); };
const loanFields = [f('principal','Capital prestado'), f('rate','Tipo de interés nominal anual','%',100), f('months','Plazo en meses','meses',600,1,1)];
// Ordinary 2026 RETA bands; the upper end of the third reduced band is exclusive.
export function selfEmployedBand2026(income) {
 const bands = [[670,653.59,718.94],[900,718.95,900],[1166.70,849.67,1166.70],[1300,950.98,1300],[1500,960.78,1500],[1700,960.78,1700],[1850,1143.79,1850],[2030,1209.15,2030],[2330,1274.51,2330],[2760,1356.21,2760],[3190,1437.91,3190],[3620,1519.61,3620],[4050,1601.31,4050],[6000,1732.03,5101.20],[Infinity,1928.10,5101.20]];
 return bands.find(([upper], index) => index === 2 ? income < upper : income <= upper);
}
export const calculators = {
 'sueldo-bruto-a-neto': { fields:[f('gross','Sueldo bruto anual'),f('irpf','Retención de IRPF indicada en tu nómina','%',100),f('social','Cotizaciones a cargo del trabajador indicadas en tu nómina','%',100),f('payments','Número de pagas','pagas',24,1,1)], note:'Estimación simplificada usando los porcentajes que introduces. No calcula la retención legal ni contempla bases, topes, deducciones o retribuciones especiales.', calc:v=>{if(v.irpf+v.social>100)throw Error('La suma de porcentajes no puede superar el 100 %.');let net=v.gross*(1-(v.irpf+v.social)/100);return [money('Neto anual estimado',net),money('Neto estimado por paga',net/v.payments),money('Retención estimada',v.gross*v.irpf/100),money('Cotizaciones estimadas',v.gross*v.social/100)];}},
 'indemnizacion-por-despido': {fields:[f('annual','Salario bruto anual regulador con pagas extra'),{key:'kind',label:'Tipo de despido',options:[['objective','Objetivo'],['unfair','Improcedente']]},f('before','Meses computables antes del 12 de febrero de 2012','meses',720,0,1),f('after','Meses computables desde el 12 de febrero de 2012','meses',720,0,1)],note:'Estimación para despido objetivo o declarado improcedente, aplicando las reglas generales del Estatuto de los Trabajadores. Introduce la antigüedad computable en meses, incluidas las fracciones que deban prorratearse; los periodos anteriores a 2012 se tratan por separado. No cubre casos especiales, salarios variables, convenios, readmisión ni impuestos. La calificación debe determinarla un profesional.',source:'https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430',calc:v=>{const daily=v.annual/365;let days,raw;if(v.kind==='objective'){raw=20*(v.before+v.after)/12;days=Math.min(raw,360);}else{const old=45*v.before/12;raw=old+33*v.after/12;const limit=old>720?Math.min(old,1260):720;days=Math.min(raw,limit);}return [money('Indemnización bruta estimada',daily*days),qty('Días de salario computados',days),money('Importe antes del límite',daily*raw)];}},
 'finiquito': {fields:[f('wages','Salario pendiente bruto'),f('holidays','Vacaciones pendientes brutas'),f('bonus','Pagas extra pendientes brutas'),f('other','Otros importes pendientes brutos'),f('deductions','Deducciones aplicables')],note:'Suma de los importes que introduces; no calcula devengos, retenciones ni indemnización. Consulta tu nómina y convenio.',calc:v=>{let total=v.wages+v.holidays+v.bonus+v.other;if(v.deductions>total)throw Error('Las deducciones no pueden superar el importe bruto.');return [money('Finiquito estimado',total-v.deductions),money('Total bruto indicado',total),money('Deducciones indicadas',v.deductions)];}},
 'simulador-hipotecas': {fields:loanFields,note:'Cuota constante por sistema francés, con tipo fijo y pagos mensuales. No incluye seguros, impuestos, comisiones ni cambios de tipo.',source:mortgageSource,calc:v=>{let m=loan(v.principal,v.rate,v.months);return [money('Cuota mensual estimada',m),money('Total pagado',m*v.months),money('Intereses totales',m*v.months-v.principal)];}},
 'prestamos-personales': {fields:loanFields,note:'Cuota constante por sistema francés, con tipo fijo y pagos mensuales. No incluye comisiones ni otros gastos.',source:mortgageSource,calc:v=>{let m=loan(v.principal,v.rate,v.months);return [money('Cuota mensual estimada',m),money('Total pagado',m*v.months),money('Intereses totales',m*v.months-v.principal)];}},
 'calculadora-tae': {fields:[...loanFields,f('initial','Gastos iniciales incluidos'),f('monthly','Gastos mensuales incluidos')],note:'TAE orientativa mediante flujos mensuales regulares: cuota francesa más gastos mensuales y gastos iniciales descontados del importe recibido. No incluye otros costes ni fechas irregulares; la TAE contractual puede diferir.',source:'https://clientebancario.bde.es/pcb/es/menu-horizontal/podemosayudarte/simuladores/calculo_tae_prestamo_personal.html',calc:v=>{if(v.principal<=0||v.initial>=v.principal)throw Error('El capital debe ser mayor que cero y superar los gastos iniciales.');let pay=loan(v.principal,v.rate,v.months)+v.monthly,net=v.principal-v.initial;let lo=0,hi=1;const pv=r=>r===0?pay*v.months:pay*(-Math.expm1(-v.months*Math.log1p(r)))/r;while(pv(hi)>net&&hi<1e6)hi*=2;for(let i=0;i<120;i++){let mid=(lo+hi)/2;if(pv(mid)>net)lo=mid;else hi=mid;}return [pct('TAE orientativa',Math.expm1(12*Math.log1p((lo+hi)/2))*100),money('Pago mensual con gastos',pay),money('Importe neto recibido',net)];}},
 'interes-compuesto': {fields:[f('initial','Capital inicial'),f('monthly','Aportación mensual'),f('rate','Rentabilidad nominal anual supuesta','%',100),f('years','Duración','años',50)],note:'Rentabilidad constante, capitalización mensual y aportaciones al final de cada mes. No incluye impuestos, comisiones ni pérdidas; no garantiza resultados futuros.',calc:v=>{let n=Math.round(v.years*12),r=v.rate/1200,factor=Math.pow(1+r,n),value=v.initial*factor+v.monthly*(r? (factor-1)/r:n),paid=v.initial+v.monthly*n;return [money('Capital final estimado',value),money('Total aportado',paid),money('Rendimiento estimado',value-paid)];}},
 'dividendos': {fields:[f('shares','Número de acciones','acciones',1000000000),f('dividend','Dividendo bruto anual por acción'),f('withholding','Retención aplicada','%',100)],note:'Estimación para un dividendo constante y una retención introducida por ti. No contempla cambios de dividendo, fiscalidad final, tipos de cambio ni comisiones.',calc:v=>{let gross=v.shares*v.dividend;return [money('Dividendo anual neto estimado',gross*(1-v.withholding/100)),money('Dividendo anual bruto',gross),money('Retención estimada',gross*v.withholding/100)];}},
 'precio-medio-inversion': {fields:[f('q1','Cantidad de la primera compra','unidades'),f('p1','Precio unitario de la primera compra'),f('q2','Cantidad de la segunda compra','unidades'),f('p2','Precio unitario de la segunda compra'),f('fees','Comisiones totales')],note:'Media ponderada de dos compras incluyendo las comisiones introducidas; no contempla ventas, impuestos ni tipo de cambio.',calc:v=>{let q=v.q1+v.q2;if(!q)throw Error('La cantidad total debe ser mayor que cero.');let cost=v.q1*v.p1+v.q2*v.p2+v.fees;return [money('Precio medio por unidad',cost/q),qty('Unidades totales',q),money('Coste total',cost)];}},
 'calculadora-irpf': {fields:[f('gross','Renta anual sujeta estimada'),f('rate','Tipo medio efectivo estimado por ti','%',100),f('withheld','Retenciones ya practicadas')],note:'Operación orientativa con el tipo medio que tú facilitas; no calcula tramos estatales ni autonómicos, mínimos, deducciones o liquidación oficial. El tipo de retención de la AEAT no equivale necesariamente al tipo efectivo final.',source:'https://sede.agenciatributaria.gob.es/Sede/Retenciones.shtml',calc:v=>{let tax=v.gross*v.rate/100,balance=tax-v.withheld;return [money('Cuota estimada con el tipo indicado',tax),money(balance>=0?'Diferencia estimada pendiente':'Diferencia estimada a favor',Math.abs(balance)),money('Retenciones indicadas',v.withheld)];}},
 'cuota-autonomos': {fields:[f('income','Rendimiento neto mensual computable estimado')],note:'Estimación de 2026 para el RETA ordinario, con cobertura completa y base mínima del tramo. Introduce el rendimiento neto mensual ya calculado conforme a la Seguridad Social. No incluye cuota reducida, bonificaciones, pluriactividad, bases elegidas o excepciones; la cotización puede regularizarse.',source:contributionSource,calc:v=>{const [,min,max]=selfEmployedBand2026(v.income);return [money('Cuota mensual estimada con base mínima',min*0.315),money('Base mínima del tramo',min),money('Base máxima del tramo',max),money('Cuota anual estimada con base mínima',min*0.315*12)];}},
 'calculadora-iva': {fields:[f('amount','Importe'),f('rate','Tipo de IVA aplicable','%',100),{key:'mode',label:'El importe introducido',options:[['base','No incluye IVA'],['total','Incluye IVA']]}],note:'Elige el tipo aplicable a la operación. Los tipos generales incluyen 21 %, 10 %, 4 % y, en determinados casos, 0 %; hay operaciones exentas o no sujetas.',source:vatSource,calc:v=>{let base=v.mode==='total'?v.amount/(1+v.rate/100):v.amount,vat=base*v.rate/100;return [money('Total con IVA',base+vat),money('Base imponible',base),money('Cuota de IVA',vat)];}},
 'rentabilidad-alquiler': {fields:[f('price','Precio de compra'),f('purchaseCosts','Gastos de compra'),f('rent','Alquiler mensual'),f('expenses','Gastos anuales'),f('vacant','Meses sin alquilar al año','meses',12)],note:'Rentabilidad anual simple sobre la inversión inicial. No incluye financiación, impuestos personales, revalorización ni costes no introducidos.',calc:v=>{let investment=v.price+v.purchaseCosts;if(!investment)throw Error('La inversión inicial debe ser mayor que cero.');let income=v.rent*(12-v.vacant),net=income-v.expenses;return [pct('Rentabilidad neta anual estimada',net/investment*100),pct('Rentabilidad bruta anual estimada',income/investment*100),money('Ingresos anuales estimados',income),money('Resultado anual antes de impuestos',net)];}},
 'calculadora-inflacion': {fields:[f('amount','Importe actual'),f('rate','Inflación anual supuesta','%',100),f('years','Años','años',100)],note:'Inflación constante supuesta; no predice la inflación futura. El poder adquisitivo se expresa en euros de hoy.',calc:v=>{let factor=Math.pow(1+v.rate/100,v.years);return [money('Poder adquisitivo futuro en euros de hoy',v.amount/factor),money('Importe futuro equivalente',v.amount*factor),pct('Subida acumulada de precios',100*(factor-1))];}},
 'objetivos-de-ahorro': {fields:[f('goal','Objetivo de ahorro'),f('current','Ahorro actual'),f('months','Tiempo disponible','meses',1200,1,1)],note:'Aportaciones mensuales iguales, sin intereses ni comisiones. Si ya has alcanzado el objetivo, la aportación necesaria es cero.',calc:v=>{let remaining=Math.max(0,v.goal-v.current);return [money('Ahorro mensual necesario',remaining/v.months),money('Importe que falta',remaining),money('Objetivo',v.goal)];}}
};
// Spanish notation: optional groups of three after dots, comma for decimals.
export function parseSpanishNumber(text) {
 const value = text.trim();
 if (!/^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/.test(value)) return NaN;
 return Number(value.replaceAll('.', '').replace(',', '.'));
}
export function formatSpanishInput(text) {
 const value = text.trim();
 if (!Number.isFinite(parseSpanishNumber(value))) return text;
 const [integer, decimals] = value.replaceAll('.', '').split(',');
 const grouped = integer.replace(/^0+(?=\d)/, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
 return decimals === undefined ? grouped : `${grouped},${decimals}`;
}
// Group digits while typing without rounding or removing a trailing decimal comma.
export function formatSpanishTyping(text) {
 const ungrouped=text.replaceAll('.','');
 if(!/^\d*(?:,\d*)?$/.test(ungrouped)) return text;
 const [integer,decimals]=ungrouped.split(',');
 const grouped=integer.replace(/\B(?=(\d{3})+(?!\d))/g,'.');
 return decimals===undefined?grouped:`${grouped},${decimals}`;
}
function groupInputWhileTyping(input,event) {
 if(event.isComposing || event.data==='.') return;
 // Do not silently reinterpret an invalid pasted value containing dots.
 if(event.inputType==='insertFromPaste' && input.value.includes('.') && !Number.isFinite(parseSpanishNumber(input.value))) return;
 const original=input.value, formatted=formatSpanishTyping(original);
 if(formatted===original) return;
 const position=index=>{
  const count=original.slice(0,index).replaceAll('.','').length;
  if(!count)return 0;
  let seen=0;for(let i=0;i<formatted.length;i++){if(formatted[i]!=='.')seen++;if(seen===count)return i+1;}
  return formatted.length;
 };
 const start=position(input.selectionStart??original.length),end=position(input.selectionEnd??original.length);
 input.value=formatted;input.setSelectionRange(start,end);
}
export function calculate(slug, values) { const spec=calculators[slug]; if(!spec) throw Error('Herramienta no disponible.'); for(const field of spec.fields){const value=values[field.key];if(field.options){if(!field.options.some(([v])=>v===value))throw Error('Selecciona una opción válida.');}else if(typeof value!=='number'||!Number.isFinite(value)||value<field.min||value>field.max||(field.step===1&&!Number.isInteger(value)))throw Error(`Revisa el campo «${field.label}». Usa punto para miles y coma para decimales, por ejemplo 12.000,50.`);}const results=spec.calc(values);if(results.some(x=>!Number.isFinite(x.value)))throw Error('No se puede calcular el resultado con esos valores.');return results; }
export function mountCalculator(root) {
 const slug=root.dataset.slug, spec=calculators[slug]; if(!spec)return;
 root.replaceChildren();
 const heading=document.createElement('h2');heading.textContent='Introduce los datos';root.append(heading);
 const note=document.createElement('p');note.textContent=spec.note;root.append(note);
 const hint=document.createElement('p');hint.className='calc-format-hint';hint.id=`format-hint-${slug}`;hint.textContent='Escribe las cifras seguidas: añadimos los puntos de miles. Para decimales, usa la coma.';root.append(hint);
 const form=document.createElement('form');form.className='calc-form';
 const fields=document.createElement('div');fields.className='calc-fields';
 for(const field of spec.fields){
  const label=document.createElement('label');label.textContent=field.label;let input;
  if(field.options){input=document.createElement('select');for(const [value,text] of field.options){const option=document.createElement('option');option.value=value;option.textContent=text;input.append(option);}}
  else{input=document.createElement('input');input.type='text';input.inputMode='decimal';input.required=true;input.placeholder='0';input.setAttribute('aria-describedby',hint.id);input.addEventListener('input',event=>groupInputWhileTyping(input,event));input.addEventListener('blur',()=>{input.value=formatSpanishInput(input.value);});}
  input.name=field.key;label.append(input);if(field.unit){const unit=document.createElement('small');unit.textContent=field.unit;label.append(unit);}fields.append(label);
 }
 form.append(fields);const actions=document.createElement('div');actions.className='calc-actions';const submit=document.createElement('button');submit.type='submit';submit.className='button';submit.textContent='Calcular';const reset=document.createElement('button');reset.type='reset';reset.className='button secondary';reset.textContent='Reiniciar';actions.append(submit,reset);form.append(actions);
 const output=document.createElement('div');output.className='calc-output';output.setAttribute('aria-live','polite');
 form.addEventListener('submit',e=>{
  e.preventDefault();output.replaceChildren();
  try{
   const values={};for(const field of spec.fields){const input=form.elements.namedItem(field.key);values[field.key]=field.options?input.value:parseSpanishNumber(input.value);}
   const results=calculate(slug,values);
   const formatResult=result=>result.format==='money'?euro.format(result.value):number.format(result.value)+(result.format==='percent'?' %':'');
   for(const result of results){const row=document.createElement('div');const name=document.createElement('span');name.textContent=result.label;const value=document.createElement('strong');value.textContent=formatResult(result);row.append(name,value);output.append(row);}
   const exportArea=document.createElement('section');exportArea.className='calc-export';
   const exportButton=document.createElement('button');exportButton.type='button';exportButton.className='button secondary';exportButton.textContent='Guardar resultado en PDF';
   const help=document.createElement('p');help.textContent='En la ventana que se abre, selecciona «Guardar como PDF».';
   exportButton.addEventListener('click',()=>{
    document.querySelectorAll('.print-report').forEach(report=>report.remove());
    const report=document.createElement('article');report.className='print-report';
    const addText=(tag,text)=>{const element=document.createElement(tag);element.textContent=text;report.append(element);};
    const addRow=(label,value)=>{const row=document.createElement('div');row.className='print-report-row';const name=document.createElement('span');name.textContent=label;const detail=document.createElement('strong');detail.textContent=value;row.append(name,detail);report.append(row);};
    addText('p','EuroMetric · Tu dinero. Tus decisiones.');addText('h1',document.querySelector('main h1')?.textContent?.trim()||'Resultado de la calculadora');
    addText('p',`Fecha: ${new Intl.DateTimeFormat('es-ES',{dateStyle:'long'}).format(new Date())}`);
    addText('h2','Datos introducidos');
    for(const field of spec.fields){const input=form.elements.namedItem(field.key);const value=field.options?input.selectedOptions[0]?.textContent:formatSpanishInput(input.value)+(field.unit?` ${field.unit}`:'');addRow(field.label,value||'');}
    addText('h2','Resultados');for(const result of results)addRow(result.label,formatResult(result));
    addText('h2','Supuestos y límites');addText('p',spec.note);addText('p','Resultado orientativo. No sustituye el asesoramiento financiero, fiscal, laboral o legal personalizado.');
    document.body.append(report);window.addEventListener('afterprint',()=>report.remove(),{once:true});window.print();
   });
   exportArea.append(exportButton,help);output.append(exportArea);
  }catch(error){const p=document.createElement('p');p.className='calc-error';p.textContent=error instanceof Error?error.message:'Revisa los datos introducidos.';output.append(p);}
 });
 form.addEventListener('input',()=>output.replaceChildren());form.addEventListener('change',()=>output.replaceChildren());form.addEventListener('reset',()=>output.replaceChildren());root.append(form,output);
 if(spec.source){const p=document.createElement('p');const a=document.createElement('a');a.href=spec.source;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Consultar fuente oficial';a.className='text-link';p.append(a);root.append(p);}
}
if(typeof document!=='undefined')document.querySelectorAll('[data-calculator]').forEach(mountCalculator);
