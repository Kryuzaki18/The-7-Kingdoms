import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../../store/auth/auth.actions';
import { selectAuthError, selectIsLoading } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);

  readonly isLoading = toSignal(this.store.select(selectIsLoading), { initialValue: false });
  readonly errorMessage = toSignal(this.store.select(selectAuthError), { initialValue: null });
  readonly showPassword = signal(false);

  readonly form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rememberMe: [false],
  });

  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.clearAuthError());
  }

  toggleShowPassword(): void {
    this.showPassword.update((v) => !v);
  }

  // loginWithGoogle(): void {}

  onSubmit(): void {
    if (this.form.invalid || this.isLoading()) return;

    this.store.dispatch(AuthActions.clearAuthError());

    const { email, password, rememberMe } = this.form.getRawValue();
    this.store.dispatch(AuthActions.login({ email, password, rememberMe: rememberMe ?? false }));
  }
}
