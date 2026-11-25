import test from 'node:test';
import assert from 'node:assert/strict';
import { calculate, calculators, parseSpanishNumber, formatSpanishInput, formatSpanishTyping, selfEmployedBand2026 } from '../public/calculators.js';
import { tools } from '../src/data/tools.ts';
const first=(slug,values)=>calculate(slug,values)[0].value;
const near=(actual,expected)=>assert.ok(Math.abs(actual-expected)<0.001,`${actual} != ${expected}`);
test('all catalog tools have an implementation',()=>assert.deepEqual(Object.keys(calculators).sort(),tools.map(t=>t.slug).sort()));
test('IVA adds or removes the selected rate',()=>{near(first('calculadora-iva',{amount:100,rate:21,mode:'base'}),121);near(calculate('calculadora-iva',{amount:121,rate:21,mode:'total'})[1].value,100)});
test('loans handle zero interest and a conventional fixed rate',()=>{near(first('prestamos-personales',{principal:1200,rate:0,months:12}),100);near(first('simulador-hipotecas',{principal:100000,rate:3,months:360}),421.604)});
test('TAE includes fees in the periodic cash flows',()=>{near(first('calculadora-tae',{principal:1200,rate:0,months:12,initial:0,monthly:0}),0);assert.ok(first('calculadora-tae',{principal:1200,rate:0,months:12,initial:50,monthly:0})>0)});
test('investment and savings calculations',()=>{near(first('interes-compuesto',{initial:1000,monthly:100,rate:0,years:1}),2200);near(first('dividendos',{shares:100,dividend:2,withholding:19}),162);near(first('precio-medio-inversion',{q1:10,p1:10,q2:10,p2:20,fees:0}),15);near(first('objetivos-de-ahorro',{goal:1200,current:0,months:12}),100)});
test('cash-flow and manually supplied tax assumptions',()=>{near(first('sueldo-bruto-a-neto',{gross:30000,irpf:15,social:6,payments:12}),23700);near(first('finiquito',{wages:1000,holidays:200,bonus:100,other:0,deductions:100}),1200);near(first('calculadora-irpf',{gross:20000,rate:15,withheld:2000}),3000)});
test('autónomos 2026 applies official band boundaries and minimum base',()=>{near(first('cuota-autonomos',{income:1000}),849.67*0.315);assert.equal(selfEmployedBand2026(1166.69)[1],849.67);assert.equal(selfEmployedBand2026(1166.70)[1],950.98);assert.equal(selfEmployedBand2026(670)[1],653.59);assert.equal(selfEmployedBand2026(670.01)[1],718.95)});
test('severance uses general legal rates and transitional limits',()=>{near(first('indemnizacion-por-despido',{annual:36500,kind:'objective',before:0,after:24}),4000);near(first('indemnizacion-por-despido',{annual:36500,kind:'unfair',before:0,after:24}),6600);near(first('indemnizacion-por-despido',{annual:36500,kind:'unfair',before:240,after:120}),90000);near(first('indemnizacion-por-despido',{annual:36500,kind:'unfair',before:480,after:120}),126000)});
test('rentability and inflation make their assumptions explicit',()=>{near(first('rentabilidad-alquiler',{price:100000,purchaseCosts:0,rent:1000,expenses:2000,vacant:0}),10);near(first('calculadora-inflacion',{amount:100,rate:10,years:1}),100/1.1)});
test('invalid input is rejected',()=>{assert.throws(()=>first('prestamos-personales',{principal:100,rate:5,months:0}));assert.throws(()=>first('cuota-autonomos',{income:-1}));assert.throws(()=>first('calculadora-iva',{amount:NaN,rate:21,mode:'base'}));});
test('Spanish numeric input distinguishes thousands and decimals',()=>{
 assert.equal(parseSpanishNumber('12.000'),12000);
 assert.equal(parseSpanishNumber('12,00'),12);
 assert.equal(parseSpanishNumber('1.234.567,89'),1234567.89);
 assert.equal(parseSpanishNumber('12000,50'),12000.5);
 assert.equal(formatSpanishInput('12000,50'),'12.000,50');
 assert.equal(formatSpanishInput('12,00'),'12,00');
 assert.equal(first('calculadora-iva',{amount:parseSpanishNumber('12.000'),rate:parseSpanishNumber('21'),mode:'base'}),14520);
});
test('malformed and ambiguous input is not silently reinterpreted',()=>{
 for(const text of ['', '1.2', '12.00', '1,234.56', '1.23.456', '12,', '-2', '1e3']) assert.ok(Number.isNaN(parseSpanishNumber(text)),text);
 assert.throws(()=>first('calculadora-iva',{amount:parseSpanishNumber('12.00'),rate:21,mode:'base'}));
});
test('typing groups thousands without changing decimals or trailing comma',()=>{
 assert.equal(formatSpanishTyping('12000'),'12.000');
 assert.equal(formatSpanishTyping('12.0000'),'120.000');
 assert.equal(formatSpanishTyping('1234567,89'),'1.234.567,89');
 assert.equal(formatSpanishTyping('12000,'),'12.000,');
 assert.equal(formatSpanishTyping('12000,00'),'12.000,00');
 assert.equal(formatSpanishTyping('12,3,4'),'12,3,4');
 assert.equal(parseSpanishNumber(formatSpanishTyping('12000,50')),12000.5);
});
