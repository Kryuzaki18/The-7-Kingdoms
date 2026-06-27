import { Component, input, output } from '@angular/core';
import { Layout } from '../../../core/types/layout';

@Component({
  selector: 'app-generic-card',
  imports: [],
  templateUrl: './generic-card.component.html',
  styleUrl: './generic-card.component.scss',
})
export class GenericCardComponent {
  title = input.required<string>();
  subtitle = input<string | undefined>(undefined);
  titleItalic = input<boolean>(false);
  layout = input<Layout>('list');
  clicked = output<void>();
}
