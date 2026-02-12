import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CvService } from '../../services/cv.service';
import { ExperienceItem } from '../../models/cv.model';
import { NgForOf, JsonPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf,JsonPipe],
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
    private toastr: ToastrService
  ) {
    this.experienceForm = this.fb.group({
      jobs: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    // 1. Cargar datos existentes del servicio
    const savedExperience = this.cvService.getCV().experience;

    if (savedExperience.length > 0) {
      savedExperience.forEach(item => {
        this.jobs.push(this.createJobGroup(item));
      });
    } else {
      // Si no hay datos, añadimos un trabajo vacío
      this.jobs.push(this.createJobGroup());
    }

    // 2. Escuchar cambios y guardarlos en el servicio
    this.experienceForm.valueChanges.subscribe(value => {
      const experience: ExperienceItem[] = value.jobs;
      this.cvService.updateExperience(experience);
    });
  }

  createJobGroup(item?: ExperienceItem): FormGroup {
  return this.fb.group({
    role: [item?.role || '', [Validators.required]],
    company: [item?.company || '', [Validators.required]],
    startYear: [item?.startYear || null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
    endYear: [item?.endYear || null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
    description: [item?.description || '', [Validators.required, Validators.minLength(10)]],
  });
}

  addJob(): void {
    this.jobs.push(this.createJobGroup());
    this.toastr.success('Perfil guardado');
  }

  removeJob(index: number): void {
    this.jobs.removeAt(index);
  }
}