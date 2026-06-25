import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Character } from '../../../core/types/characters.model';

@Component({
  selector: 'app-character-info',
  imports: [],
  templateUrl: './character-info.component.html',
  styleUrl: './character-info.component.scss',
})
export class CharacterInfoComponent {
  @Input() character!: Character;
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closed.emit();
  }

  onBackdropClick(): void {
    this.closed.emit();
  }

  get displayName(): string {
    if (this.character.name) return this.character.name;
    const alias = this.character.aliases.find((a) => a);
    return alias ?? 'Unknown';
  }

  get activeTitles(): string[] {
    return this.character.titles.filter((t) => t);
  }

  get activeAliases(): string[] {
    return this.character.aliases.filter((a) => a);
  }

  get activeTvSeries(): string[] {
    return this.character.tvSeries.filter((s) => s);
  }

  get activePlayedBy(): string[] {
    return this.character.playedBy.filter((p) => p);
  }

  get genderLabel(): string {
    return this.character.gender || 'Unknown';
  }
}
