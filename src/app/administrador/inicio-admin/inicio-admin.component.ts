import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../service/supabase.service';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-inicio-admin',
  imports: [],
  templateUrl: './inicio-admin.component.html',
  styleUrl: './inicio-admin.component.css'
})
export class InicioAdminComponent implements OnInit {
  emailUsuario: string | undefined = "";
  numberCuadros: any[] = [];
  numberUsers: any[] = [];
  chart: any; // Instancia de la gráfica

  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.createChart(); // Crea la gráfica
    this.getNumberCuadros(); // Obtiene los cuadros
    this.getNumberUsers(); // Obtiene los usuarios

  }

  // Método para obtener usuarios
  getNumberUsers() {
    this.supabaseService.getUsers().subscribe({
      next: usuarios => {
        this.numberUsers = usuarios.data;

        if (this.chart) {
          // Actualiza el índice 0 (Usuarios) de la gráfica
          this.chart.data.datasets[0].data[0] = this.numberUsers.length;
          this.chart.update(); // Refresca la gráfica
        }
      },
      error: err => console.log(err)
    });
  }

  // Método para obtener cuadros
  getNumberCuadros() {
    this.supabaseService.getCuadros().subscribe({
      next: cuadros => {
        this.numberCuadros = cuadros;

        if (this.chart) {
          // Actualiza el índice 1 (Cuadros) de la gráfica
          this.chart.data.datasets[0].data[1] = this.numberCuadros.length;
          this.chart.update(); // Refresca la gráfica
        }
      },
      error: err => console.log(err)
    });
  }

  // Método para crear la gráfica
  createChart(): void {
    const ctx = document.getElementById('chart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Usuarios', 'Cuadros', 'Likes'],
        datasets: [
          {
            label: 'Cantidad',
            data: [0, 0, 0], // Inicializa con valores predeterminados
            backgroundColor: ['#4CAF50', '#FFC107', '#F44336']
          }
        ]
      }
    });
  }
}
