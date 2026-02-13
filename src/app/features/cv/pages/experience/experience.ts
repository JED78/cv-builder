import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CvService } from '../../services/cv.service';
import { ExperienceItem } from '../../models/cv.model';
import { NgForOf, JsonPipe } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf, JsonPipe, MatSnackBarModule],
  templateUrl: './experience.html',
  styleUrls: ['./experience.css'],
})
export class ExperienceComponent implements OnInit {

  experienceForm: FormGroup;

  get jobs(): FormArray {
    return this.experienceForm.get('jobs') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private cvService: CvService,
    private snack: MatSnackBar
  ) {

    const savedExperience = this.cvService.getCV().experience;

    this.experienceForm = this.fb.group({
      jobs: this.fb.array(
        savedExperience.length > 0
          ? savedExperience.map(item => this.createJobGroup(item))
          : [this.createJobGroup()]
      )
    });
  }

  ngOnInit(): void {
    this.experienceForm.valueChanges.subscribe(value => {
      const experience: ExperienceItem[] = value.jobs;
      this.cvService.updateExperience(experience);
    });
  }

  createJobGroup(item?: ExperienceItem): FormGroup {
    return this.fb.group({
      role: [item?.role || '', [Validators.required]],
      company: [item?.company || '', [Validators.required]],
      startYear: [
        item?.startYear || null,
        [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]
      ],
      endYear: [
        item?.endYear || null,
        [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]
      ],
      description: [item?.description || '', [Validators.required, Validators.minLength(10)]],
    });
  }

  addJob(): void {
    if (this.experienceForm.invalid) {
      this.markAllJobsAsTouched();
      this.snack.open('Completa los campos antes de añadir otra experiencia', '', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    this.jobs.push(this.createJobGroup());

    this.snack.open('Experiencia añadida', '', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
  }

  removeJob(index: number): void {
    this.jobs.removeAt(index);
  }

  // 🔥 Marca TODOS los controles internos correctamente
  markAllJobsAsTouched(): void {
    this.jobs.controls.forEach(group => {
      const controls = (group as FormGroup).controls;
      Object.values(controls).forEach(control => {
        control.markAsTouched();
        control.updateValueAndValidity();
      });
    });
  }

  save(): void {

    // Si no hay ningún formulario
    if (this.jobs.length === 0) {
      this.snack.open('Añade al menos una experiencia antes de guardar', '', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    // Si los campos están vacíos o inválidos
    if (this.experienceForm.invalid) {
      this.markAllJobsAsTouched();
      this.snack.open('Revisa los campos obligatorios', '', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    // Todo correcto
    this.snack.open('Experiencia guardada', '', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
  }
}