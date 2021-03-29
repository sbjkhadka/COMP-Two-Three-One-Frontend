import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-print-my-grocery',
  templateUrl: './print-my-grocery.component.html',
  styleUrls: ['./print-my-grocery.component.css']
})
export class PrintMyGroceryComponent implements OnInit {
  @Input() groceryList: BehaviorSubject<any>;
  today = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
