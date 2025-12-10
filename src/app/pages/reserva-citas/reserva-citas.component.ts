import { Component, OnInit } from '@angular/core';


interface Cita {
  fecha: string;
  oa: string;
  nombrePaciente: string;
  nombreMedico: string;
  especialidad: string;
  estado: string;
}

@Component({
  selector: 'app-reserva-citas',
  templateUrl: './reserva-citas.component.html',
  styleUrls: ['./reserva-citas.component.scss']
})
export class ReservaCitasComponent implements OnInit {
especialidades = ['Cardiología', 'Neurología', 'Pediatría'];

  filtro = {
    dni: '',
    nombres: '',
    especialidad: '',
    fecha: ''
  };

  citas: Cita[] = [
    { fecha: '20/09/2025', oa: '99999999', nombrePaciente: 'Rivas Casimiro Alan', nombreMedico: 'Rivas Casimiro Elena', especialidad: 'Cardiología', estado: 'Pendiente' },
    { fecha: '20/09/2025', oa: '99999999', nombrePaciente: 'Rivas Casimiro Alan', nombreMedico: 'Rivas Casimiro Alan', especialidad: 'Cardiología', estado: 'Atendido' },
    { fecha: '20/09/2025', oa: '99999999', nombrePaciente: 'Rivas Casimiro Alan', nombreMedico: 'Rivas Casimiro Jimena', especialidad: 'Cardiología', estado: 'Atendido' },
  ];

  selectedCita: Cita | null = null;

  constructor() { }

  ngOnInit(): void { }

  seleccionar(cita: Cita) {
    this.selectedCita = cita;
  }

  buscar() {
    // Aquí puedes filtrar la tabla con this.filtro
    console.log('Filtrando citas', this.filtro);
  }

  nuevo() {
    console.log('Crear nueva cita');
  }

  editar() {
    console.log('Editar cita', this.selectedCita);
  }

  detalle() {
    console.log('Detalle cita', this.selectedCita);
  }

  anular() {
    console.log('Anular cita', this.selectedCita);
  }
}