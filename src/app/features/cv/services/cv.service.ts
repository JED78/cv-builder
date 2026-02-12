import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CV, Profile, EducationItem, ExperienceItem, SkillItem } from '../models/cv.model';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  private storageKey = 'cv-data';

  private cvState: CV = {
    profile: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      summary: '',
    },
    education: [],
    experience: [],
    skills: [],
  };

  private cvSubject = new BehaviorSubject<CV>(this.cvState);
  cv$ = this.cvSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  // -----------------------------
  // CARGAR DESDE LOCALSTORAGE
  // -----------------------------
  private loadFromStorage() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      this.cvState = JSON.parse(stored);
      this.emit();
    }
  }

  // -----------------------------
  // GUARDAR EN LOCALSTORAGE
  // -----------------------------
  private saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cvState));
  }

  // -----------------------------
  // MÉTODOS DE ACTUALIZACIÓN
  // -----------------------------
  updateProfile(profile: Profile) {
    this.cvState.profile = profile;
    this.emit();
  }

  updateEducation(education: EducationItem[]) {
    this.cvState.education = education;
    this.emit();
  }

  updateExperience(experience: ExperienceItem[]) {
    this.cvState.experience = experience;
    this.emit();
  }

  updateSkills(skills: SkillItem[]) {
    this.cvState.skills = skills;
    this.emit();
  }

  // Obtener el CV completo
  getCV(): CV {
    return this.cvState;
  }

  // Emitir cambios + guardar en localStorage
  private emit() {
    this.cvSubject.next({ ...this.cvState });
    this.saveToStorage();
  }

  // Borrar localStorage y resetear estado
  resetCV() {
  localStorage.removeItem(this.storageKey);

  this.cvState = {
    profile: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      summary: '',
    },
    education: [],
    experience: [],
    skills: [],
  };

  this.emit();
}
}