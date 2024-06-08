import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../../types';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  constructor(private formBuilder: FormBuilder) {}

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
        control.value
      );

      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }

  productForm = this.formBuilder.group({
    name: ['', [Validators.required, this.specialCharacterValidator()]],
    image: [''],
    price: ['', [Validators.required]],
    rating: [0],
  });

  ngOnChanges() {
    this.productForm.patchValue({
      name: this.product.name,
      image: this.product.image,
      price: this.product.price,
      rating: this.product.rating,
    });
  }

  @Input() display: boolean = false;
  @Input() header!: string;
  @Output() displayChange = new EventEmitter<boolean>();

  @Output() confirm = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  onConfirm() {
    this.confirm.emit({
      name: this.product.name || '',
      image: this.product.image || '',
      price: this.product.price || '',
      rating: this.product.rating || 0,
    });

    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  showDialog() {
    this.display = true;
  }

  onSubmit() {
    console.log('submit');
  }
}
