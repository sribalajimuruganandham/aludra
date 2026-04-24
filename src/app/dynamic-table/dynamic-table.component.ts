import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  ReactiveFormsModule,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { DynamicTableService } from './dynamic-table.service';
import { TableConfig, ColumnConfig } from './table-config.model';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './dynamic-table.component.html'
})
export class DynamicTableComponent implements OnChanges {
  @Input() config!: TableConfig;

  form: FormGroup;
  editMode    = false;
  loading     = false;
  savingIndex: number | null = null;

  constructor(
    private fb:      FormBuilder,
    private service: DynamicTableService,
    private toast:   MessageService
  ) {
    this.form = this.fb.group({ rows: this.fb.array([]) });
  }

  // ── accessors ──────────────────────────────────────────────

  get rows(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  getRowGroup(i: number): FormGroup {
    return this.rows.at(i) as FormGroup;
  }

  // ── lifecycle ──────────────────────────────────────────────

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']?.currentValue) {
      this.editMode = false;
      this.form.setControl('rows', this.fb.array([]));
      this.loadData();
    }
  }

  // ── data ───────────────────────────────────────────────────

  private buildRow(row: Record<string, unknown>): FormGroup {
    const controls: Record<string, unknown> = {
      id: [row['id'] ?? null]
    };
    this.config.columns.forEach((col: ColumnConfig) => {
      controls[col.key] = [
        row[col.key] ?? '',
        col.required ? [Validators.required] : []
      ];
    });
    return this.fb.group(controls);
  }

  loadData(): void {
    this.loading = true;
    this.service.getData<Record<string, unknown>>(this.config.api).subscribe({
      next: (data) => {
        this.form.setControl(
          'rows',
          this.fb.array(data.map(r => this.buildRow(r)))
        );
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load data' });
      }
    });
  }

  // ── actions ────────────────────────────────────────────────

  save(i: number): void {
    const group = this.getRowGroup(i);
    if (group.invalid) {
      group.markAllAsTouched();
      return;
    }
    this.savingIndex = i;
    const { id, ...payload } = group.value as { id: number } & Record<string, unknown>;

    this.service.updateRow(this.config.api, id, payload).subscribe({
      next: () => {
        this.savingIndex = null;
        this.toast.add({ severity: 'success', summary: 'Saved', detail: 'Row updated' });
      },
      error: () => {
        this.savingIndex = null;
        this.toast.add({ severity: 'error', summary: 'Error', detail: 'Save failed' });
      }
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.loadData();
    }
  }

  isInvalid(i: number, key: string): boolean {
    const ctrl = this.getRowGroup(i).get(key);
    return !!(ctrl?.invalid && ctrl?.touched);
  }
}
