import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CvService } from '../../services/cv.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,   // Necesario para *ngIf, *ngFor, pipes, etc.
    JsonPipe
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cvService: CvService,
    private toastr: ToastrService
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
    const savedProfile = this.cvService.getCV().profile;
    this.profileForm.patchValue(savedProfile);

    this.profileForm.valueChanges.subscribe(value => {
      this.cvService.updateProfile(value);
    });
  }

  saveProfile(): void {
   
    if (this.profileForm.valid) {
      this.cvService.updateProfile(this.profileForm.value);
      this.toastr.success('Perfil guardado');
   
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;

      this.profileForm.patchValue({ photo: base64 });

      this.cvService.updateProfile({
        ...this.profileForm.value,
        photo: base64
      });

      const imgElement = document.getElementById('profile-photo-preview') as HTMLImageElement;
      if (imgElement) {
        imgElement.src = base64;
      }
    };

    reader.readAsDataURL(file);
  }

  removePhoto() {
    this.profileForm.patchValue({ photo: '' });

    this.cvService.updateProfile({
      ...this.profileForm.value,
      photo: ''
    });

    const imgElement = document.getElementById('profile-photo-preview') as HTMLImageElement;
    if (imgElement) {
      imgElement.src = '';
    }
  }
}