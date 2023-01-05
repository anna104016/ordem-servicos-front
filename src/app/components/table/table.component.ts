import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() title: string;
  @Input() loading: boolean;
  @Output() onPress = new EventEmitter();
  @Output() getNext = new EventEmitter();
  @Input() buttonTooltip: string;
  @Input() pageIndex: number;
  @Input() pageSizeOptions: number[];
  @Input() pageSize: number;
  @Input() totalElements: number;

  constructor() {}

  ngOnInit(): void {}

  functionOnPress() {
    this.onPress.emit();
  }

  ongetNext(event) {
    this.getNext.emit(event);
  }
}
