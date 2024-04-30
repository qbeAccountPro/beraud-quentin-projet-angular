import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements AfterViewInit {

  @Input() highlight!: string;

  constructor(private el: ElementRef,
    private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.setBackgroundColor(this.highlight);
  }

  setBackgroundColor(highlight: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', highlight);
  }
  
  @HostListener('mouseenter') onMouseEnter() {
    this.setBackgroundColor('lightgreen');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBackgroundColor(this.highlight);
  }

  @HostListener('click') onClick() {
    this.highlight = 'lightgreen';
  }
}