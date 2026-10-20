import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, checkmark } from 'ionicons/icons';
import { QueueEntry } from '../models/queue-entry';

@Component({
  selector: 'app-queue-item', standalone: true,
  imports: [IonButton, IonCard, IonCardContent, IonIcon],
  templateUrl: './queue-item.component.html', styleUrl: './queue-item.component.scss'
})
export class QueueItemComponent {
  @Input({ required: true }) entry!: QueueEntry;
  @Input() selected = false;
  @Output() choose = new EventEmitter<QueueEntry>();
  constructor() { addIcons({ add, checkmark }); }
  select(): void { this.choose.emit(this.entry); }
}
