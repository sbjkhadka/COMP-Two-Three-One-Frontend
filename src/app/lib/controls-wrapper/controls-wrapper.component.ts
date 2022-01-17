import {AfterContentInit, Component, ContentChild, HostBinding, HostListener, Input, OnInit} from '@angular/core';
import {InputRefDirective} from './common/input-ref.directive';

@Component({
  selector: 'app-controls-wrapper',
  templateUrl: './controls-wrapper.component.html',
  styleUrls: ['./controls-wrapper.component.css']
})
export class ControlsWrapperComponent implements AfterContentInit {

  @Input() icon: string;
  @ContentChild(InputRefDirective) input: InputRefDirective;
  constructor() { }

  ngAfterContentInit(): void {
    if (!this.input) {
      console.error('Input not present');
    }
  }

  get classes(): any {
    const iconClasses = { fa: true};
    if (this.icon) {
      iconClasses[`fa-${this.icon}`] = true;
    }
    return iconClasses;
  }

  @HostBinding('class.input-focussed') get isInputFocus(): boolean {
    return this.input ? this.input.focus : false;
  }

}
