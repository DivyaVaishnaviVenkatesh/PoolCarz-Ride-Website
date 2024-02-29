import { Directive, HostListener, Renderer2, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appMouseHover]'
})
export class MouseHoverDirective {
  @Input() appMouseHover: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (this.appMouseHover) {
      this.highlight('blue');
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.appMouseHover) {
      this.highlight(null);
    }
  }

  private highlight(color: string | null) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }
}
