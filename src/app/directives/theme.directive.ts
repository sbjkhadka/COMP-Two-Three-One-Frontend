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
      value.toLowerCase() === 'color' ?
        this.toggleClass('border-colored', 'border-dark') : this.toggleClass('border-dark', 'border-colored');
    } else if (this.where === 'button') {
      // Login component: CSS issue
      value.toLowerCase() === 'color' ?
        this.toggleClass('button', 'button-dark') : this.toggleClass('button-dark', 'button');
    } else if (this.where === 'addRecipe') {
      value.toLowerCase() === 'color' ?
        this.toggleClass('add-recipe-color', 'add-recipe-dark-color') : this.toggleClass('add-recipe-dark-color', 'add-recipe-color');
    } else if (this.where === 'addRecipeColored') {
      value.toLowerCase() === 'color' ?
        this.toggleClass('add-recipe-dark-color', 'add-recipe-color') : this.toggleClass('add-recipe-color', 'add-recipe-dark-color');
    } else if (this.where === 'themeBg') {
      value.toLowerCase() === 'color' ?
        this.toggleClass('theme-dark-bg', 'theme-bg') : this.toggleClass('theme-bg', 'theme-dark-bg');
    } else if (this.where === 'themeFont') {
      value.toLowerCase() === 'color' ?
        this.toggleClass('theme-font', 'theme-bg') : this.toggleClass('theme-bg', 'theme-font');
    } else if (this.where === 'image') {
      value.toLowerCase() === 'color' ?
        this.toggleClass('image-dark', 'image-color') : this.toggleClass('image-color', 'image-dark');
    } else if (this.where === 'themeBgInverse') {
      value.toLowerCase() === 'color' ?
        this.toggleClass('theme-dark-bg-inverse', 'theme-bg-inverse') : this.toggleClass('theme-bg-inverse', 'theme-dark-bg-inverse');
    } else if (this.where === 'btnThemeDarkBg') {
      value.toLowerCase() === 'color' ?
        this.toggleClass('theme-dark-bg', 'btn-primary') : this.toggleClass('btn-primary', 'theme-dark-bg');
    } else if (this.where === 'btnDark') {
      value.toLowerCase() === 'color' ?
        this.toggleClass('btn-dark', 'btn-primary') : this.toggleClass('btn-primary', 'btn-dark');
    } else if (this.where === 'lavenderGrayBg') {
      // only used in register-auth. Remove it later
      value.toLowerCase() === 'color' ?
        this.toggleClass('theme-bg-light-gray', 'theme-bg-lavender') : this.toggleClass('theme-bg-lavender', 'theme-bg-light-gray');
    } else if (this.where === 'iconColorRed') {
      value.toLowerCase() === 'color' ?
        this.toggleClass('icon-color-gray', 'icon-color-red') : this.toggleClass('icon-color-red', 'icon-color-gray');
    } else if (this.where === 'iconColorBlue') {
      value.toLowerCase() === 'color' ?
        this.toggleClass('icon-color-gray', 'icon-color-blue') : this.toggleClass('icon-color-blue', 'icon-color-gray');
    }
  }

  private toggleClass(oldClass: string, newClass: string): void {
    this.element.nativeElement.classList.add(newClass);
    this.element.nativeElement.classList.remove(oldClass);
  }

}
