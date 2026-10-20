import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel,
  IonSpinner, IonTitle, IonToolbar
} from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login', standalone: true,
  imports: [CommonModule, FormsModule, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonSpinner, IonTitle, IonToolbar],
  templateUrl: './login.page.html', styleUrl: './login.page.scss'
})
export class LoginPage {
  email = '';
  password = '';
  registering = false;
  busy = false;
  error = '';
  constructor(public auth: AuthService, private router: Router) {}
  async submit(): Promise<void> {
    this.error = ''; this.busy = true;
    try {
      if (this.registering) await this.auth.signUp(this.email, this.password);
      else await this.auth.signIn(this.email, this.password);
      await this.router.navigateByUrl('/fila', { replaceUrl: true });
    } catch (error) { this.error = error instanceof Error ? error.message : 'Não foi possível autenticar.'; }
    finally { this.busy = false; }
  }
  async google(): Promise<void> {
    this.error = ''; this.busy = true;
    try {
      await this.auth.signInWithGoogle();
      await this.router.navigateByUrl('/fila', { replaceUrl: true });
    } catch (error) { this.error = error instanceof Error ? error.message : 'Não foi possível autenticar.'; }
    finally { this.busy = false; }
  }
}
