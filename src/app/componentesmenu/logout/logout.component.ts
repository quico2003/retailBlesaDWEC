import { Component } from '@angular/core';
import { SupabaseService } from '../../service/supabase.service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(private supabaseService: SupabaseService) {

  }

  onLogout() {
    this.supabaseService.logout();

  }

}
