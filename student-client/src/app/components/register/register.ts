import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';
import { StudentService } from '../../services/student';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './register.html'
})
export class Register {

  email = signal('');
  password = signal('');
  message = signal('');

  constructor(private service: StudentService, private router: Router) {}

  register() {
  this.service.register(this.email(), this.password()).subscribe({
    next: (res) => {
      console.log('Register success', res);
      this.message.set(res.message);
      alert(res.message);
      this.router.navigate(['/login']);
    },
    error: (err) => {
      console.error('REGISTER ERROR:', err);
      this.message.set(err.error?.message || 'Registration failed');
    }
  });
}

  
}
