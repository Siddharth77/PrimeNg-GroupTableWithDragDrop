import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h3>PrimeNg-{{name}}!</h3>`,
  styles: [`h5 { font-family: Lato; }`]
})
export class HelloComponent  {
  @Input() name: string;
}
