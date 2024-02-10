import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  @Input('appHighlight') highlightText!: string;

  constructor(private el: ElementRef) {
    el.nativeElement.style.fontSize = "20px";  
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight("20px");
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight("16px");
  }

  private highlight(fontSize: string) {
    this.el.nativeElement.style.fontSize = fontSize;
  }
}
