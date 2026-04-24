import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { TableConfig } from './dynamic-table/table-config.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TitleCasePipe, DynamicTableComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  activeIndex = 0;

  readonly configs: TableConfig[] = [
    {
      module: 'employee',
      api: '/api/employees',
      columns: [
        { key: 'name', label: 'Name', type: 'text',     required: true  },
        { key: 'age',  label: 'Age',  type: 'number',   required: true  },
        { key: 'dob',  label: 'DOB',  type: 'date',     required: false },
        {
          key: 'role', label: 'Role', type: 'dropdown',
          options: ['Admin', 'User'], required: true
        }
      ]
    },
    {
      module: 'product',
      api: '/api/products',
      columns: [
        { key: 'title',    label: 'Title',    type: 'text',   required: true  },
        { key: 'price',    label: 'Price',    type: 'number', required: true  },
        { key: 'stock',    label: 'Stock',    type: 'number', required: false },
        {
          key: 'category', label: 'Category', type: 'dropdown',
          options: ['Electronics', 'Accessories'], required: true
        }
      ]
    }
  ];

  get activeConfig(): TableConfig {
    return this.configs[this.activeIndex];
  }

  switchModule(index: number): void {
    this.activeIndex = index;
  }
}
