import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: 'app-controls-wrapper input'
})
export class InputRefDirective {
  focus = false;
  constructor() { }

  @HostListener('focus') onFocus(): void {
    this.focus = true;
  }

  @HostListener('blur') onBlur(): void {
    this.focus = false;
  }

}
