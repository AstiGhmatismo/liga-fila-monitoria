import { Injectable } from '@angular/core';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { Observable, of } from 'rxjs';
import { QueueAction, QueueEntry } from '../models/queue-entry';
import { auth, db } from './firebase.client';

const PRINT_QUEUE: QueueEntry[] = [
  { id: 'sample-ana', name: 'Ana', topic: 'Angular', position: 1, isSample: true },
  { id: 'sample-bruno', name: 'Bruno', topic: 'Firebase', position: 2, isSample: true },
  { id: 'sample-carla', name: 'Carla', topic: 'CSS', position: 3, isSample: true },
  { id: 'sample-diego', name: 'Diego', topic: 'Rotas', position: 4, isSample: true },
  { id: 'sample-elena', name: 'Elena', topic: 'Service', position: 5, isSample: true }
];

@Injectable({ providedIn: 'root' })
export class QueueService {
  private entries: QueueEntry[] = PRINT_QUEUE;
  readonly limit = 5;
  watchEntries(): Observable<QueueEntry[]> {
    if (!db) { this.entries = PRINT_QUEUE; return of(this.entries); }
    const queueQuery = query(collection(db, 'filaMonitoria'), orderBy('position', 'asc'));
    return new Observable<QueueEntry[]>(subscriber => onSnapshot(queueQuery, snapshot => {
      this.entries = snapshot.empty ? PRINT_QUEUE : snapshot.docs.map(doc => ({
        id: doc.id, ...(doc.data() as Omit<QueueEntry, 'id'>)
      }));
      subscriber.next(this.entries);
    }, error => subscriber.error(error)));
  }
  filterByTopic(topic: string): QueueEntry[] {
    return topic === 'Todas' ? this.entries : this.entries.filter(entry => entry.topic === topic);
  }
  totalEntries(): number { return this.entries.length; }
  isFull(): boolean { return this.totalEntries() >= this.limit; }
  async recordJoinAttempt(topic: string): Promise<void> {
    if (!auth?.currentUser || !db) throw new Error('Entre com Firebase configurado para gravar a tentativa.');
    const action: QueueAction = {
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName || auth.currentUser.email || 'Estudante',
      topic, action: 'join_attempt', status: 'blocked',
      total: this.totalEntries(), createdAt: serverTimestamp()
    };
    await addDoc(collection(db, 'queueActions'), action);
  }
}
