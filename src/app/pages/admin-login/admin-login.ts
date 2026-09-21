import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-admin-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss',
})
export class AdminLogin {
  serverError = signal<string | null>(null);
  submitting = signal(false);
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.serverError.set(null);
    this.submitting.set(true);

    const { email, password } = this.form.value;
    this.authService.adminLogin(email!, password!).subscribe({
      next: () => this.router.navigate(['/admin/bookings']),
      error: () => {
        this.serverError.set('Incorrect email or password.');
        this.submitting.set(false);
      }
    });
  }
}