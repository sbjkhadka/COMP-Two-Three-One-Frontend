import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { ThemeService } from '../shared-services/theme.service';

@Directive({
  selector: '[appTheme]'
})
export class ThemeDirective implements AfterViewInit {

  @Input() where;

  constructor(private element: ElementRef,
              private themeService: ThemeService) {
  }

  ngAfterViewInit(): void {
    this.themeService.theme.subscribe(value => {
      this.applyTheme(value);
    });
  }

  private applyTheme(value: string): void {
    if (this.where === 'mainContainer') {
      value.toLowerCase() === 'color' ?
      this.toggleClass('main-container-dark', 'main-container') : this.toggleClass('main-container', 'main-container-dark');
    } else if (this.where === 'border') {
      // Login component: CSS issue
      console.log('VAL', value);
      value.toLowerCase() === 'color' ?
        this.toggleClass('border-colored', 'border-dark') : this.toggleClass('border-dark', 'border-colored');
    } else if (this.where === 'button') {
      // Login component: CSS issue
      console.log('where', this.where);
      value.toLowerCase() === 'color' ?
        this.toggleClass('button', 'button-dark') : this.toggleClass('button-dark', 'button');
    } else if (this.where === 'addRecipe') {
      value.toLowerCase() === 'color' ?
        this.toggleClass('add-recipe-color', 'add-recipe-dark-color') : this.toggleClass('add-recipe-dark-color', 'add-recipe-color');
    } else if (this.where === 'themeBg') {
      value.toLowerCase() === 'color' ?
        this.toggleClass('theme-dark-bg', 'theme-bg') : this.toggleClass('theme-bg', 'theme-dark-bg');
    }
  }

  private toggleClass(oldClass: string, newClass: string): void {
    this.element.nativeElement.classList.add(newClass);
    this.element.nativeElement.classList.remove(oldClass);
  }

}
