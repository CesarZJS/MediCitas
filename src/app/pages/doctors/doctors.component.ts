import { Component, OnInit } from '@angular/core';
import { DoctorsService } from 'src/app/services/doctors.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

  doctors: any[] = [];
  filteredDoctors: any[] = [];
  
  // Filtros
  filterDni: string = '';
  filterName: string = '';
  filterSpecialty: string = '';
  filterState: string = '';

  // Modal
  showModal: boolean = false;
  isEditMode: boolean = false;
  currentDoctorId: number | null = null;
  
  // Formulario del doctor
  doctorForm: any = {
    dni: '',
    specialtyId: '',
    cmp: '',
    enabled: true
  };

  constructor(private doctorsService: DoctorsService) { }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctorsService.getAllDoctors().subscribe({
      next: (response) => {
        if (response.code === 0) {
          this.doctors = response.data || [];
          this.filteredDoctors = [...this.doctors];
        } else {
          console.error('Error:', response.message);
          this.doctors = [];
          this.filteredDoctors = [];
        }
      },
      error: (error) => {
        console.error('Error al cargar doctores:', error);
        this.doctors = [];
        this.filteredDoctors = [];
      }
    });
  }

  searchDoctors(): void {
    this.filteredDoctors = this.doctors.filter(doctor => {
      const matchDni = this.filterDni ? doctor.dni.includes(this.filterDni) : true;
      const matchName = this.filterName ? doctor.name?.toLowerCase().includes(this.filterName.toLowerCase()) : true;
      const matchSpecialty = this.filterSpecialty ? doctor.specialtyId === +this.filterSpecialty : true;
      const matchState = this.filterState ? (this.filterState === 'active' ? doctor.enabled : !doctor.enabled) : true;
      
      return matchDni && matchName && matchSpecialty && matchState;
    });
  }

  clearFilters(): void {
    this.filterDni = '';
    this.filterName = '';
    this.filterSpecialty = '';
    this.filterState = '';
    this.filteredDoctors = [...this.doctors];
  }

  deleteDoctor(id: number): void {
    if (confirm('¿Estás seguro de eliminar este doctor?')) {
      this.doctorsService.deleteDoctor(id).subscribe({
        next: (response) => {
          if (response.code === 0) {
            alert('Doctor eliminado exitosamente');
            this.loadDoctors();
          } else {
            alert('Error: ' + response.message);
          }
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          alert('Error al eliminar doctor');
        }
      });
    }
  }

  // MODAL METHODS
  openModal(): void {
    this.showModal = true;
    this.isEditMode = false;
    this.resetForm();
  }

  closeModal(): void {
    this.showModal = false;
    this.resetForm();
  }

resetForm(): void {
  this.doctorForm = {
    dni: '',
    name: '',
    paternalSurname: '',
    maternalSurname: '',
    email: '',
    password: '',
    specialtyId: '',
    cmp: '',
    enabled: true
  };
  this.currentDoctorId = null;
}

  saveDoctor(): void {
    if (this.isEditMode && this.currentDoctorId) {
      // Actualizar
      this.doctorsService.updateDoctor(this.currentDoctorId, this.doctorForm).subscribe({
        next: (response) => {
          if (response.code === 0) {
            alert('Doctor actualizado exitosamente');
            this.loadDoctors();
            this.closeModal();
          } else {
            alert('Error: ' + response.message);
          }
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Error al actualizar doctor');
        }
      });
    } else {
      // Registrar nuevo
      this.doctorsService.registerDoctor(this.doctorForm).subscribe({
        next: (response) => {
          if (response.code === 0) {
            alert('Doctor registrado exitosamente');
            this.loadDoctors();
            this.closeModal();
          } else {
            alert('Error: ' + response.message);
          }
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Error al registrar doctor');
        }
      });
    }
  }

  editDoctor(id: number): void {
    this.isEditMode = true;
    this.currentDoctorId = id;
    
    // Cargar datos del doctor
    this.doctorsService.getDoctorById(id).subscribe({
      next: (response) => {
        if (response.code === 0) {
          const doctor = response.data;
          this.doctorForm = {
            dni: doctor.dni,
            specialtyId: doctor.specialtyId,
            cmp: doctor.cmp,
            enabled: doctor.enabled
          };
          this.showModal = true;
        }
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Error al cargar doctor');
      }
    });
  }


  getSpecialtyName(id: number): string {
  const specialties: any = {
    1: 'Cardiología',
    2: 'Pediatría',
    3: 'Medicina General'
  };
  return specialties[id] || 'N/A';
}
}