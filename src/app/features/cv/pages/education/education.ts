import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CvService } from '../../services/cv.service';
import { EducationItem } from '../../models/cv.model';
import { Validators } from '@angular/forms';
import { NgForOf, JsonPipe } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-education',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf, JsonPipe, MatSnackBarModule
],
  templateUrl: './education.html',
  styleUrls: ['./education.css'],
})
export class EducationComponent implements OnInit {
  educationForm: FormGroup;

  get studies(): FormArray {
    return this.educationForm.get('studies') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private cvService: CvService,
    private snack: MatSnackBar
  ) {
    this.educationForm = this.fb.group({
      studies: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    // 1. Cargar datos existentes del servicio
    const savedEducation = this.cvService.getCV().education;

    if (savedEducation.length > 0) {
      savedEducation.forEach(item => {
        this.studies.push(this.createStudyGroup(item));
      });
    } else {
      // Si no hay datos, añadimos un estudio vacío
      this.studies.push(this.createStudyGroup());
    }

    // 2. Escuchar cambios y guardarlos en el servicio
    this.educationForm.valueChanges.subscribe(value => {
      const education: EducationItem[] = value.studies;
      this.cvService.updateEducation(education);
    });
  }

  createStudyGroup(item?: EducationItem): FormGroup {
  return this.fb.group({
    title: [item?.title || '', [Validators.required]],
    institution: [item?.institution || '', [Validators.required]],
    startYear: [
      item?.startYear || null,
      [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]
    ],
    endYear: [
      item?.endYear || null,
      [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]
    ],
  });
}



  addStudy(): void {
      if (this.educationForm.invalid) {
    this.educationForm.markAllAsTouched();
    this.snack.open('Completa todos los datos correctamente', '', {
  duration: 3000,
  panelClass: ['snackbar-error']
});
    return;
  }else
{
  

    this.studies.push(this.createStudyGroup());
    this.snack.open('Perfil almacenado', '', {
  duration: 3000,
  panelClass: ['snackbar-success']
});

  }
}

  removeStudy(index: number): void {
    this.studies.removeAt(index);
  }

  // Animacion para eliminar controles 
  removingIndex: number | null = null;

startRemoveAnimation(index: number) {
  this.removingIndex = index;

  setTimeout(() => {
    this.removeStudy(index);
    this.removingIndex = null;
  }, 350);
}
}