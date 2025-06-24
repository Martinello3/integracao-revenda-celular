import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SaleService } from '../services/sale.service';
import { CustomerService } from 'src/app/customers/services/customer.service';
import { StoreService } from 'src/app/stores/services/store.service';
import { PhoneService } from 'src/app/phones/services/phone.service';
import { AccessoryService } from 'src/app/accessories/services/accessory.service';
import { Customer } from 'src/app/customers/models/customer.type';
import { Store } from 'src/app/stores/models/store.type';
import { Phone } from 'src/app/phones/models/phone.type';
import { Accessory } from 'src/app/accessories/models/accessory.type';
import { PaymentMethods, SaleStatus, Sale } from '../models/sale.type';
import { priceMask, maskitoElement, parseNumberMask, formatNumberMask } from 'src/app/core/constants/mask.constants';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.scss'],
  standalone: false,
})
export class SaleFormComponent implements OnInit {
  saleForm: FormGroup;
  saleId: string | number | null = null;
  customersList: Customer[] = [];
  storesList: Store[] = [];
  phonesList: Phone[] = [];
  accessoriesList: Accessory[] = [];
  paymentMethods = PaymentMethods;
  saleStatus = SaleStatus;
  priceMask = priceMask;
  maskitoElement = maskitoElement;
  maxDate: string;

  constructor(
    private fb: FormBuilder,
    private saleService: SaleService,
    private customerService: CustomerService,
    private storeService: StoreService,
    private phoneService: PhoneService,
    private accessoryService: AccessoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController
  ) {
    this.saleForm = this.createForm();
    this.maxDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit() {
    this.loadCustomers();
    this.loadStores();
    this.loadPhones();
    this.loadAccessories();
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.saleId = id;
        this.loadSale(this.saleId);
      } else {
        this.saleForm.get('date')?.setValue(new Date().toISOString().split('T')[0]);
      }
    });

    this.itemsFormArray.valueChanges.subscribe(() => {
      this.updateTotals();
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      date: ['', Validators.required],
      customer: ['', Validators.required],
      store: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      status: ['pending', Validators.required],
      seller: ['', Validators.required],
      items: this.fb.array([]),
      totalValue: [0]
    });
  }

  get itemsFormArray(): FormArray {
    return this.saleForm.get('items') as FormArray;
  }

  createItemForm(): FormGroup {
    const itemForm = this.fb.group({
      productType: ['phone', Validators.required],
      product: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: ['0', Validators.required], 
      subtotal: ['0'] 
    });

    
    itemForm.get('product')?.valueChanges.subscribe((product: Phone | Accessory | any) => {
      if (product && typeof product === 'object' && 'price' in product) {
        const price = product.price ? formatNumberMask(parseFloat(product.price)) : '0';
        itemForm.get('unitPrice')?.setValue(price);
        
        this.updateItemSubtotal(itemForm);
      }
    });

    itemForm.get('quantity')?.valueChanges.subscribe(() => {
      this.updateItemSubtotal(itemForm);
    });
    
    itemForm.get('unitPrice')?.valueChanges.subscribe(() => {
      this.updateItemSubtotal(itemForm);
    });

    return itemForm;
  }

  addItem() {
    this.itemsFormArray.push(this.createItemForm());
  }

  removeItem(index: number) {
    this.itemsFormArray.removeAt(index);
  }

  getProductType(index: number): string {
    return this.itemsFormArray.at(index).get('productType')?.value || 'phone';
  }

  loadSale(id: string | number) {
    this.saleService.getById(+id).subscribe({
      next: (sale) => {
        Promise.all([
          this.customerService.getAll().toPromise(),
          this.storeService.getList().toPromise(),
          this.phoneService.getList().toPromise(),
          this.accessoryService.getList().toPromise()
        ]).then(() => {
          console.log('Listas carregadas:', {
            phones: this.phonesList.length,
            accessories: this.accessoriesList.length,
            customers: this.customersList.length,
            stores: this.storesList.length
          });

          while (this.itemsFormArray.length) {
            this.itemsFormArray.removeAt(0);
          }

          console.log('Sale items to load:', sale.items);

          sale.items.forEach(item => {
            const itemForm = this.createItemForm();

            // Buscar o produto correto nas listas carregadas
            let product = null;
            if (item.productType === 'phone') {
              product = this.phonesList.find(phone => phone.id === item.productId);
              console.log(`Buscando phone ID ${item.productId}:`, product);
            } else if (item.productType === 'accessory') {
              product = this.accessoriesList.find(accessory => accessory.id === item.productId);
              console.log(`Buscando accessory ID ${item.productId}:`, product);
            }

            console.log('Item form data:', {
              productType: item.productType,
              productId: item.productId,
              product: product,
              quantity: item.quantity,
              unitPrice: item.unitPrice
            });

            itemForm.patchValue({
              productType: item.productType,
              product: product,
              quantity: item.quantity,
              unitPrice: formatNumberMask(item.unitPrice),
              subtotal: formatNumberMask(item.subtotal)
            });
            this.itemsFormArray.push(itemForm);
          });
          
          // Buscar customer e store corretos nas listas carregadas
          const customer = this.customersList.find(c => c.id === sale.customerId) || sale.customer;
          const store = this.storesList.find(s => s.id === sale.storeId) || sale.store;

          console.log('Customer and store data:', {
            customerId: sale.customerId,
            customer: customer,
            storeId: sale.storeId,
            store: store
          });

          this.saleForm.patchValue({
            date: new Date(sale.date).toISOString().split('T')[0],
            customer: customer,
            store: store,
            paymentMethod: sale.paymentMethod,
            status: sale.status,
            seller: sale.seller,
            totalValue: formatNumberMask(sale.totalValue)
          });
        });
      },
      error: (error) => {
        console.error('Erro ao carregar venda', error);
      }
    });
  }

  loadCustomers() {
    this.customerService.getAll().subscribe({
      next: (customers) => {
        this.customersList = customers;
      },
      error: (error) => {
        console.error('Erro ao carregar clientes', error);
      }
    });
  }

  loadStores() {
    this.storeService.getList().subscribe({
      next: (stores) => {
        this.storesList = stores;
      },
      error: (error) => {
        console.error('Erro ao carregar lojas', error);
      }
    });
  }

  loadPhones() {
    this.phoneService.getList().subscribe({
      next: (phones) => {
        this.phonesList = phones;
      },
      error: (error) => {
        console.error('Erro ao carregar celulares', error);
      }
    });
  }

  loadAccessories() {
    this.accessoryService.getList().subscribe({
      next: (accessories) => {
        this.accessoriesList = accessories;
      },
      error: (error) => {
        console.error('Erro ao carregar acessórios', error);
      }
    });
  }

  updateItemSubtotal(itemForm: FormGroup): void {
    const quantity = +itemForm.get('quantity')?.value || 0;
    const unitPrice = parseNumberMask(itemForm.get('unitPrice')?.value) || 0;
    const subtotal = quantity * unitPrice;
    
    itemForm.get('subtotal')?.setValue(formatNumberMask(subtotal), { emitEvent: false });
    this.updateTotals();
  }

  updateTotals() {
    let total = 0;
    
    for (let i = 0; i < this.itemsFormArray.length; i++) {
      const itemForm = this.itemsFormArray.at(i);
      const subtotalValue = parseNumberMask(itemForm.get('subtotal')?.value) || 0;
      total += subtotalValue;
    }
    
    this.saleForm.get('totalValue')?.setValue(formatNumberMask(total));
  }

  compareWith(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  save() {
    if (this.saleForm.invalid || this.itemsFormArray.length === 0) {
      console.log('Form invalid or no items:', {
        invalid: this.saleForm.invalid,
        errors: this.saleForm.errors,
        itemsLength: this.itemsFormArray.length,
        formControls: Object.keys(this.saleForm.controls).map(key => ({
          key,
          valid: this.saleForm.get(key)?.valid,
          errors: this.saleForm.get(key)?.errors,
          value: this.saleForm.get(key)?.value
        })),
        itemsErrors: this.itemsFormArray.controls.map((control, index) => ({
          index,
          valid: control.valid,
          errors: control.errors,
          value: control.value
        }))
      });

      // Marcar todos os campos como touched para mostrar erros
      this.saleForm.markAllAsTouched();
      this.itemsFormArray.controls.forEach(control => control.markAllAsTouched());

      return;
    }

    const formValue = this.saleForm.value;
    console.log('Form value:', formValue);

    const items = formValue.items.map((item: any) => ({
      productId: item.product?.id || 0,
      productType: item.productType,
      quantity: +item.quantity,
      unitPrice: parseNumberMask(item.unitPrice),
      subtotal: parseNumberMask(item.subtotal)
    }));

    console.log('Mapped items:', items);

    const sale: Sale = {
      ...(this.saleId ? { id: +this.saleId } : {}),
      date: formValue.date,
      customerId: formValue.customer?.id || 0,
      storeId: formValue.store?.id || 0,
      customer: formValue.customer,
      store: formValue.store,
      paymentMethod: formValue.paymentMethod,
      status: formValue.status,
      seller: formValue.seller,
      items: items,
      totalValue: parseNumberMask(formValue.totalValue)
    };

    console.log('Sale object to save:', sale);
    
    this.saleService.save(sale).subscribe({
      next: () => {
        this.toastController.create({
          message: 'Venda salva com sucesso!',
          duration: 3000,
          color: 'success'
        }).then(toast => toast.present());
        
        this.router.navigate(['/sales']);
      },
      error: (error) => {
        console.error('Erro ao salvar venda', error);
        this.toastController.create({
          message: 'Erro ao salvar venda',
          duration: 3000,
          color: 'danger'
        }).then(toast => toast.present());
      }
    });
  }

  hasError(field: string, error: string): boolean {
    const formControl = this.saleForm.get(field);
    return !!formControl?.touched && !!formControl?.errors?.[error];
  }

  hasItemError(index: number, field: string, error: string): boolean {
    const itemFormGroup = this.itemsFormArray.at(index);
    const formControl = itemFormGroup.get(field);
    return !!formControl?.touched && !!formControl?.errors?.[error];
  }
}
