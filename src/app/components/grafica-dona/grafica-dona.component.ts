import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styles: []
})
export class GraficaDonaComponent implements OnInit {

  @Input() leyenda: string;

  @Input() chartData: number[] = [];
  @Input() chartLabels: string[] = [];
  @Input() chartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}
