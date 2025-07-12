import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-register',
  standalone: true, 
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  registerForm: FormGroup;
  registerError: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        this.customEmailValidator
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator
      ]]
    });
  }

  private customEmailValidator(control: AbstractControl) {
    const email = control.value;
    if (!email) return null;
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(email);
    
    return isValid ? null : { invalidEmail: true };
  }

  private passwordStrengthValidator(control: AbstractControl) {
    const value = control.value;
    if (!value) return null;

    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);

    const passwordValid = hasLowerCase && hasNumber && value.length >= 8;
    return passwordValid ? null : { passwordWeak: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.registerError = '';
      const { email, password } = this.registerForm.value;

      this.userService.register(email, password).subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.registerError = err.error?.message || 'Registration failed. Please try again.';
        }
      });
    }
  }
}