import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TemplateService {

  templates = [
    { id: 'minimal', name: 'Minimalista', class: 'template-minimal' },
    { id: 'modern', name: 'Moderna', class: 'template-modern' },
    { id: 'classic', name: 'Clásica', class: 'template-classic' },
    { id: 'creative', name: 'Creativa', class: 'template-creative' }
  ];

  selectedTemplate = this.templates[0];

  setTemplate(id: string) {
    const found = this.templates.find(t => t.id === id);
    if (found) this.selectedTemplate = found;
  }

  getTemplate() {
    return this.selectedTemplate;
  }
}