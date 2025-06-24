import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class ApplicationValidators {

  static urlValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if(value.startsWith('http://') || value.startsWith('https://')) {
      return null;
    }
    return { invalidUrl: true }
  }

  // VALIDATORS PARA CLIENTES

  static emailDomainValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const email = control.value.toLowerCase();
    const allowedDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
    const domain = email.split('@')[1];

    if (domain && !allowedDomains.includes(domain)) {
      return { invalidDomain: true };
    }
    return null;
  }

  static phoneValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const phone = control.value.replace(/\D/g, '');
    if (phone.length !== 11) {
      return { invalidPhone: true };
    }
    return null;
  }

  static ageValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ? age - 1 : age;

    if (actualAge < 16) {
      return { tooYoung: true };
    }
    if (actualAge > 120) {
      return { tooOld: true };
    }
    return null;
  }

  static nameValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const namePattern = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (!namePattern.test(control.value)) {
      return { invalidName: true };
    }
    return null;
  }

  static addressValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    if (control.value.length < 10) {
      return { addressTooShort: true };
    }
    return null;
  }

  // VALIDATORS PARA LOJAS

  static storeNameValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const name = control.value.toLowerCase();
    const requiredWords = ['loja', 'store', 'shop'];

    if (!requiredWords.some(word => name.includes(word))) {
      return { invalidStoreName: true };
    }
    return null;
  }

  static storePhoneValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const phone = control.value.replace(/\D/g, '');
    if (phone.length !== 10 && phone.length !== 11) {
      return { invalidStorePhone: true };
    }
    return null;
  }

  static cityValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const cityPattern = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (!cityPattern.test(control.value)) {
      return { invalidCity: true };
    }
    return null;
  }

  static managerValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const managerPattern = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (!managerPattern.test(control.value)) {
      return { invalidManager: true };
    }
    return null;
  }

  // VALIDATORS PARA CELULARES

  static phoneModelValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const model = control.value.toLowerCase();
    const forbiddenWords = ['teste', 'test', 'exemplo'];

    if (forbiddenWords.some(word => model.includes(word))) {
      return { invalidModel: true };
    }
    return null;
  }

  static releaseDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const releaseDate = new Date(control.value);
    const currentDate = new Date();
    const minDate = new Date('2000-01-01');

    if (releaseDate > currentDate) {
      return { futureDate: true };
    }
    if (releaseDate < minDate) {
      return { tooOld: true };
    }
    return null;
  }

  static phonePriceValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const price = +control.value;
    if (price > 50000) {
      return { tooExpensive: true };
    }
    return null;
  }

  static phoneStockValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value && control.value !== 0) return null;

    const stock = +control.value;
    if (stock > 10000) {
      return { excessiveStock: true };
    }
    return null;
  }

  // VALIDATORS PARA ACESSÓRIOS

  static accessoryNameValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const name = control.value.toLowerCase();
    const requiredWords = ['case', 'capa', 'carregador', 'fone', 'película', 'suporte'];

    if (!requiredWords.some(word => name.includes(word))) {
      return { invalidAccessoryName: true };
    }
    return null;
  }

  static descriptionValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const description = control.value.toLowerCase();
    const forbiddenWords = ['ruim', 'péssimo', 'horrível'];

    if (forbiddenWords.some(word => description.includes(word))) {
      return { negativeDescription: true };
    }
    return null;
  }

  static accessoryPriceValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const price = +control.value;
    if (price > 5000) {
      return { tooExpensive: true };
    }
    return null;
  }

  static accessoryStockValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value && control.value !== 0) return null;

    const stock = +control.value;
    if (stock > 10000) {
      return { excessiveStock: true };
    }
    return null;
  }

  // VALIDATORS PARA VENDAS

  static stockValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value || !control.parent) return null;

    const quantity = +control.value;
    const product = control.parent.get('product')?.value;

    if (!product) {
      return null; 
    }

    if (product.stock === undefined || product.stock === null) {
      return null; 
    }

    if (product.stock === 0) {
      return { noStock: true };
    }

    if (quantity > product.stock) {
      return { stockExceeded: true };
    }

    return null;
  }
}
