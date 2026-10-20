import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { IonButton, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, IonCard, IonCardContent, IonBadge } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { alertCircle, arrowBack, lockClosed } from 'ionicons/icons';
import { QueueService } from '../core/queue.service';

@Component({
  selector: 'app-rule', standalone: true,
  imports: [CommonModule, IonButton, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, IonCard, IonCardContent, IonBadge],
  templateUrl: './rule.page.html', styleUrl: './rule.page.scss'
})
export class RulePage {
  topic = (history.state as { topic?: string }).topic || 'Monitoria PDM';
  constructor(public queue: QueueService, private location: Location) {
    addIcons({ alertCircle, arrowBack, lockClosed });
  }
  back(): void { this.location.back(); }
}
