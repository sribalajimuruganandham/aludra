# 🗂️ ng-dynamic-table

> **One component. Any module. Zero duplication.**  
> A production-grade dynamic table built with **Angular 19** + **PrimeNG 19** — fully driven by JSON config.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔁 **Reusable Table** | Single component handles any module via JSON config |
| ✏️ **Inline Edit Mode** | Toggle edit per-row with text, number, date & dropdown fields |
| 📋 **Reactive Forms** | `FormArray` + `Validators` — validation built in |
| 🌐 **Generic Service** | One `DynamicTableService` for all GET / PUT calls |
| 🧪 **Mock Interceptor** | Runs without a backend — simulates real API responses |
| 📄 **Pagination** | PrimeNG paginator — 5 / 10 / 20 rows per page |
| 🔃 **Multi-sort** | Click column headers to sort — multi-column supported |
| 🔔 **Toast Notifications** | Save success & error feedback via PrimeNG Toast |

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
ng serve
```

Open **http://localhost:4200**

---

## 🏗️ Project Structure

```
src/
└── app/
    ├── app.component.ts          ← Module tabs + config definitions
    ├── app.config.ts             ← Angular providers (HTTP, PrimeNG, Animations)
    ├── mock/
    │   └── mock.interceptor.ts   ← Simulated API (no backend needed)
    └── dynamic-table/
        ├── table-config.model.ts ← TableConfig & ColumnConfig interfaces
        ├── dynamic-table.service.ts    ← Generic getData() / updateRow()
        ├── dynamic-table.component.ts  ← FormArray logic, edit/save
        └── dynamic-table.component.html ← PrimeNG table template
```

---

## ⚙️ JSON Config Structure

```ts
{
  module: 'employee',
  api: '/api/employees',
  columns: [
    { key: 'name',  label: 'Name',  type: 'text',     required: true  },
    { key: 'age',   label: 'Age',   type: 'number',   required: true  },
    { key: 'dob',   label: 'DOB',   type: 'date',     required: false },
    { key: 'role',  label: 'Role',  type: 'dropdown', options: ['Admin', 'User'], required: true }
  ]
}
```

### Supported Field Types

| Type | Renders As |
|---|---|
| `text` | `<input type="text">` |
| `number` | `<input type="number">` |
| `date` | `<input type="date">` |
| `dropdown` | `<p-select>` with options |

---

## ➕ Adding a New Module

**Step 1** — Add config in `app.component.ts`:

```ts
{
  module: 'order',
  api: '/api/orders',
  columns: [
    { key: 'orderId', label: 'Order ID', type: 'number', required: true },
    { key: 'status',  label: 'Status',   type: 'dropdown', options: ['Pending', 'Shipped', 'Delivered'], required: true }
  ]
}
```

**Step 2** — Add mock data in `mock.interceptor.ts`:

```ts
const orderData: Row[] = [
  { id: 1, orderId: 1001, status: 'Pending' },
  { id: 2, orderId: 1002, status: 'Shipped' }
];

// Add to db:
'/api/orders': orderData
```

**That's it.** No new component, no new service.

---

## 🧱 Architecture Decisions

**Why `FormArray` over template-driven forms?**  
Full control over dynamic field validation, programmatic `markAllAsTouched()`, and clean access to each row's state via `getRowGroup(i)`.

**Why `[formGroup]="getRowGroup(i)"` on `<tr>`?**  
PrimeNG's `<p-table>` body template renders outside the form's ViewContainerRef context. Binding `[formGroup]` directly on each `<tr>` establishes the correct `ControlContainer` scope for `formControlName` to resolve against the right row group.

**Why one service?**  
`DynamicTableService` is fully generic — API path comes from config, not the service. Adding a module means zero service changes.

**Why a mock interceptor instead of `json-server`?**  
Zero dev dependencies, zero setup. The interceptor lives in the codebase, making the demo self-contained and always runnable.

---

## 🛠️ Tech Stack

- **Angular 19** — Standalone components, new control flow (`@if`, `@for`, `@switch`)
- **PrimeNG 19** — `p-table`, `p-select`, `p-button`, `p-toast`
- **Reactive Forms** — `FormBuilder`, `FormArray`, `Validators`
- **Angular HTTP** — `HttpClient` with functional interceptor (`withInterceptors`)
- **TypeScript strict mode** — fully typed throughout

---

