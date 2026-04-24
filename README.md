# ng-dynamic-table

## Run

```bash
npm install
ng serve
```

Open http://localhost:4200

## Stack
- Angular 19 + standalone components
- PrimeNG 19 (p-table, p-select, p-button, p-toast)
- Reactive Forms with FormArray
- Mock HTTP interceptor (no backend needed)

## What's in the box
- Two modules: Employee, Product — switch via tabs
- JSON-driven columns (text / number / date / dropdown)
- Toggle Edit Mode → per-row Save button
- FormArray with Validators.required per column
- Pagination + multi-column sort (PrimeNG table)
- Toast notifications on save success/error
- One generic service for all API calls

## Add a new module
Add to `configs` array in `app.component.ts`:
```ts
{
  module: 'order',
  api: '/api/orders',
  columns: [
    { key: 'status', label: 'Status', type: 'dropdown', options: ['Pending', 'Shipped'] }
  ]
}
```
Add mock data for `/api/orders` in `mock.interceptor.ts`. Done.
"# aludra" 
