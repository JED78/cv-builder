import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForOf, JsonPipe } from '@angular/common';
import { CvService } from '../../services/cv.service';
import { EducationItem } from '../../models/cv.model';
import { SkillItem } from '../../models/cv.model';


@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf,JsonPipe],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css'],
})
export class SkillsComponent implements OnInit {
  skillsForm: FormGroup;

  get skills(): FormArray {
    return this.skillsForm.get('skills') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private cvService: CvService
  ) {
    this.skillsForm = this.fb.group({
      skills: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    // 1. Cargar datos guardados
    const savedSkills = this.cvService.getCV().skills;

    if (savedSkills.length > 0) {
      savedSkills.forEach(skill => {
        this.skills.push(this.createSkillGroup(skill));
      });
    } else {
      // Si no hay datos, añadimos un skill vacío
      this.skills.push(this.createSkillGroup());
    }

    // 2. Guardar cambios en tiempo real
    this.skillsForm.valueChanges.subscribe(value => {
      const skills: SkillItem[] = value.skills;
      this.cvService.updateSkills(skills);
    });
  }

  createSkillGroup(item?: SkillItem): FormGroup {
  return this.fb.group({
    name: [item?.name || '', [Validators.required, Validators.minLength(2)]],
    level: [item?.level || 'Intermedio', [Validators.required]],
  });
}

  addSkill(): void {
    this.skills.push(this.createSkillGroup());
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }
}