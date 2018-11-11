import { Component, OnInit, Input } from '@angular/core';

/**
 * Generated class for the SelectModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'select-modal',
  templateUrl: 'select-modal.html'
})
export class SelectModalComponent implements OnInit {

  text: string;
  @Input() selectData: any[];
  option;
  constructor() {
    console.log('Hello SelectModalComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit() {
    console.log(this.selectData, 'selectData');
  }
}
