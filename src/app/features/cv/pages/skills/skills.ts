import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForOf, JsonPipe } from '@angular/common';
import { CvService } from '../../services/cv.service';
import { EducationItem } from '../../models/cv.model';
import { SkillItem } from '../../models/cv.model';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf,JsonPipe,MatSnackBarModule],
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
    private snack: MatSnackBar,
    private cvService: CvService,
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

    // Si no hay skills aún, simplemente añadimos uno
  if (this.skills.length === 0) {
    this.skills.push(this.createSkillGroup());
    return;
  }

    var lastSkill = null;
     // Obtenemos el último skill añadido
     if (this.skills.length == 0)
     {
       lastSkill = this.skills.at(0);
     }
     else 
     {
        lastSkill = this.skills.at(this.skills.length - 1);
     }

    // Si el último skill NO es válido, marcamos errores y NO añadimos otro
  if (lastSkill.invalid) {
    lastSkill.markAllAsTouched();
    this.snack.open('Revisa los campos', '', {
  duration: 3000,
  panelClass: ['snackbar-error']
});
    return;
  }
    this.skills.push(this.createSkillGroup());
    this.snack.open('Datos almacenados', '', {
  duration: 3000,
  panelClass: ['snackbar-success']
});

  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }
}