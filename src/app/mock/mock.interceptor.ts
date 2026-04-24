import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

type Row = Record<string, unknown>;

const employeeData: Row[] = [
  { id: 1, name: 'Alice Johnson', age: 29, dob: '1995-06-15', role: 'Admin' },
  { id: 2, name: 'Bob Smith',     age: 34, dob: '1990-03-22', role: 'User'  },
  { id: 3, name: 'Carol White',   age: 27, dob: '1997-11-05', role: 'User'  },
  { id: 4, name: 'David Brown',   age: 41, dob: '1983-08-19', role: 'Admin' },
  { id: 5, name: 'Eva Green',     age: 31, dob: '1993-01-30', role: 'User'  }
];

const productData: Row[] = [
  { id: 1, title: 'Laptop Pro',          price: 1299, stock: 40,  category: 'Electronics' },
  { id: 2, title: 'Wireless Mouse',      price: 29,   stock: 200, category: 'Accessories' },
  { id: 3, title: 'USB-C Hub',           price: 49,   stock: 150, category: 'Accessories' },
  { id: 4, title: 'Monitor 4K',          price: 599,  stock: 25,  category: 'Electronics' },
  { id: 5, title: 'Mechanical Keyboard', price: 139,  stock: 80,  category: 'Accessories' }
];

const db: Record<string, Row[]> = {
  '/api/employees': employeeData,
  '/api/products':  productData
};

export const mockInterceptor: HttpInterceptorFn = (req, next) => {
  const parts = req.url.split('/');
  const base  = '/' + parts.slice(1, 3).join('/');

  if (req.method === 'GET' && db[req.url]) {
    return of(new HttpResponse({ status: 200, body: structuredClone(db[req.url]) }));
  }

  if (req.method === 'PUT' && db[base]) {
    const id  = Number(parts[parts.length - 1]);
    const col = db[base];
    const idx = col.findIndex(r => r['id'] === id);
    if (idx !== -1) {
      col[idx] = { ...col[idx], ...(req.body as Row) };
    }
    return of(new HttpResponse({ status: 200, body: col[idx] }));
  }

  return next(req);
};
