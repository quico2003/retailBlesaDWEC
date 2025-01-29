import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SupabaseService } from '../../service/supabase.service';
import { LogoutComponent } from "../../componentesmenu/logout/logout.component";

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, LogoutComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  emailUsuario: string | undefined = "";
  loggRol: boolean = false;
  logg: boolean = false;

  menuAbierto: boolean = false;

  constructor(private supabaseService: SupabaseService) {

  }

  ngOnInit(): void {



    this.logg = this.supabaseService.loggedSubject.getValue();
    this.supabaseService.loggedSubject.subscribe(logged => this.logg = logged);
    this.supabaseService.isLogged();

    this.loggRol = this.supabaseService.loggedRol.getValue();
    this.supabaseService.loggedRol.subscribe(logged => this.loggRol = logged);

    this.supabaseService.getUserInfo().subscribe({
      next: usuario => {
        this.emailUsuario = usuario?.email;
      }
    });
  }

}
