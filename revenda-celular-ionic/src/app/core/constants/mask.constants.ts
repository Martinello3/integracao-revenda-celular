import { MaskitoElementPredicate, MaskitoOptions } from "@maskito/core";
import {
  maskitoDateOptionsGenerator, maskitoNumberOptionsGenerator,
  maskitoParseDate, maskitoStringifyDate,
  maskitoParseNumber, maskitoStringifyNumber,
  MaskitoDateMode,
} from "@maskito/kit";

const dateMask = maskitoDateOptionsGenerator({ mode: 'dd/mm/yyyy', separator: '/' });
const priceMask = maskitoNumberOptionsGenerator({
  decimalSeparator: '.',
  min: 0,
  precision: 2,
  thousandSeparator: ','
});

// Máscara de telefone brasileira simples (sem dependência do @maskito/phone)
const phoneMask: MaskitoOptions = {
  mask: [
    '(',
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ]
};

const maskitoElement: MaskitoElementPredicate = async (el) =>
  (el as HTMLIonInputElement).getInputElement();

const parseDateMask = (date: string, mode: MaskitoDateMode = 'dd/mm/yyyy') => {
  return maskitoParseDate(date, { mode })
}

const formatDateMask = (date: Date): string => {
  return maskitoStringifyDate(date, { mode: 'dd/mm/yyyy', separator: '/' });
}

const parseNumberMask = (value: string): number => {
  if (!value) return 0;
  // Remove separadores de milhares e mantém apenas o ponto decimal
  const cleanValue = value.replace(/,/g, '');
  return parseFloat(cleanValue) || 0;
}

const formatNumberMask = (value: number): string => {
  if (!value || isNaN(value)) return '0.00';
  return maskitoStringifyNumber(value, {
    decimalSeparator: '.',
    precision: 2,
    thousandSeparator: ','
  });
}

export {
  dateMask,
  priceMask,
  phoneMask,
  maskitoElement,
  parseDateMask,
  formatDateMask,
  parseNumberMask,
  formatNumberMask
}
