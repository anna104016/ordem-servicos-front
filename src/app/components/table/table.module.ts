import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    declarations: [TableComponent],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatPaginatorModule
    ],
    exports: [TableComponent]
})
export class TableModule{}