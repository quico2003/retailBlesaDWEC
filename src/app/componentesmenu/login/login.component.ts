import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../service/supabase.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  correoelectronico: string = '';
  contrasenya: string = '';
  error: string | undefined;

  constructor(private supabaseservice: SupabaseService, private router: Router) { }


  sendLogin() {

    this.supabaseservice.login(this.correoelectronico, this.contrasenya).subscribe({
      next: logindata => console.log("tocken", logindata),
      complete: () => {
        window.location.reload();
        this.router.navigate(['/inicio']);
      },
      error: error => this.error = error
    })
  }

}
