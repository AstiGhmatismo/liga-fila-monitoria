import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBadge, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel,
  IonSelect, IonSelectOption, IonTitle, IonToolbar
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { chevronForward, logOut, people } from 'ionicons/icons';
import { AuthService } from '../core/auth.service';
import { QueueService } from '../core/queue.service';
import { QueueEntry } from '../models/queue-entry';
import { QueueItemComponent } from '../components/queue-item.component';

@Component({
  selector: 'app-queue', standalone: true,
  imports: [CommonModule, FormsModule, QueueItemComponent, IonBadge, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonSelect, IonSelectOption, IonTitle, IonToolbar],
  templateUrl: './queue.page.html', styleUrl: './queue.page.scss'
})
export class QueuePage implements OnInit, OnDestroy {
  entries: QueueEntry[] = [];
  visibleEntries: QueueEntry[] = [];
  selected: QueueEntry | null = null;
  topic = 'Todas';
  error = '';
  private subscription?: Subscription;
  constructor(public auth: AuthService, public queue: QueueService, private router: Router) {
    addIcons({ chevronForward, logOut, people });
  }
  ngOnInit(): void {
    this.subscription = this.queue.watchEntries().subscribe({
      next: entries => { this.entries = entries; this.applyFilter(); },
      error: () => { this.error = 'Não foi possível carregar a fila do Firestore.'; }
    });
  }
  ngOnDestroy(): void { this.subscription?.unsubscribe(); }
  topics(): string[] { return ['Todas', ...new Set(this.entries.map(entry => entry.topic))]; }
  applyFilter(): void { this.visibleEntries = this.queue.filterByTopic(this.topic); }
  choose(entry: QueueEntry): void { this.selected = entry; }
  async continue(): Promise<void> {
    const selectedTopic = this.selected?.topic || this.topic;
    try {
      if (this.queue.isFull()) await this.queue.recordJoinAttempt(selectedTopic === 'Todas' ? 'Monitoria PDM' : selectedTopic);
      await this.router.navigate(['/regra'], { state: { topic: selectedTopic } });
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Não foi possível registrar a tentativa.';
    }
  }
  async logout(): Promise<void> {
    await this.auth.signOut();
    await this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
