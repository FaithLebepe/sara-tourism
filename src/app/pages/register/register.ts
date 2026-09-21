import { AuthService } from '../../core/services/auth';
import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

function passwordsMatch(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordsMismatch: true };
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  standalone: true, 
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  serverError = signal<string | null>(null);
  submitting = signal(false);
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    }, { validators: passwordsMatch });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.serverError.set(null);
    this.submitting.set(true);

    const { name, surname, email, password, dateOfBirth } = this.form.value;
    this.authService.register({ name: name!, surname: surname!, email: email!, password: password!, dateOfBirth: dateOfBirth! })
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => {
          this.serverError.set(err.error?.error ?? 'Something went wrong. Please try again.');
          this.submitting.set(false);
        }
      });
  }
}