export interface QueueEntry {
  id: string;
  name: string;
  topic: string;
  position: number;
  isSample?: boolean;
}
export interface QueueAction {
  uid: string;
  displayName: string;
  topic: string;
  action: 'join_attempt';
  status: 'blocked';
  total: number;
  createdAt: unknown;
}
