import { Component, EventEmitter, Input, Output } from '@angular/core';
import ICategory from 'src/app/models/category.interface';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() item?: ICategory;
  @Output() clicked = new EventEmitter();
}
