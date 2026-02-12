import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CvService } from '../../services/cv.service';
import { JsonPipe } from '@angular/common';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cvService: CvService
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15)]],
      summary: ['', [Validators.required, Validators.minLength(20)]],
      photo: ['']
    });
  }

  ngOnInit(): void {
    // Cargar datos guardados
    const savedProfile = this.cvService.getCV().profile;
    this.profileForm.patchValue(savedProfile);

    // Guardar cambios en tiempo real
    this.profileForm.valueChanges.subscribe(value => {
      this.cvService.updateProfile(value);
    });
  }

  // 🔵 Método para guardar manualmente desde el botón
  saveProfile(): void {
    if (this.profileForm.valid) {
      this.cvService.updateProfile(this.profileForm.value);
      console.log('Perfil guardado:', this.profileForm.value);
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  // Método para manejar la selección de foto de perfils
onPhotoSelected(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  console.log("Archivo seleccionado:", file);

  const reader = new FileReader();
  reader.onload = () => {
    const base64 = reader.result as string;

    console.log("imagen selecionada", file.name, file.size, file.type);

    // Actualizamos el formulario
    this.profileForm.patchValue({ photo: base64 });

    // Actualizamos el servicio
    this.cvService.updateProfile({
      ...this.profileForm.value,
      photo: base64
    });

    console.log("Foto actualizada en el formulario y servicio:", base64);

    // Actualizamos el HTML directamente
    const imgElement = document.getElementById('profile-photo-preview') as HTMLImageElement;
    console.log("Foto actualizada en el elemento HTML:", imgElement);

    if (imgElement) {
      imgElement.src = base64;
    }
  };

  reader.readAsDataURL(file);
}

 // Método para eliminar la foto de perfil
removePhoto() {
  this.profileForm.patchValue({ photo: '' });

  // Actualizamos el servicio
  this.cvService.updateProfile({
    ...this.profileForm.value,
    photo: ''
  });

  // Actualizamos el DOM directamente
  const imgElement = document.getElementById('profile-photo-preview') as HTMLImageElement;
  if (imgElement) {
    imgElement.src = '';
  }
}


}