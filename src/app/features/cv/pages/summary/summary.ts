import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvService } from '../../services/cv.service';
import { CV } from '../../models/cv.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.html',
  styleUrls: ['./summary.css', './templates.css', './template-thumbnails.css'],
})
export class SummaryComponent implements OnInit {

  cv: CV = {
    profile: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      summary: ''
    },
    education: [],
    experience: [],
    skills: []
  };

  templates: any[] = [];
  selectedTemplate: any = null;

  constructor(
    private cvService: CvService,
    private templateService: TemplateService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.templates = this.templateService.templates;
    this.selectedTemplate = this.templateService.getTemplate();
console.log('CV actualizado en SummaryComponent:', this.cv);
    this.cvService.cv$.subscribe(cv => {
      this.cv = cv;
      console.log('CV actualizado en SummaryComponent:', this.cv);
    });
  }

  clearCV() {
    this.cvService.resetCV();
  }

  oklchToRgb(oklch: string): string {
    const regex = /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/i;
    const match = oklch.match(regex);

    if (!match) return oklch;

    let L = parseFloat(match[1]);
    let C = parseFloat(match[2]);
    let h = parseFloat(match[3]);

    const hr = (h * Math.PI) / 180;

    const a = C * Math.cos(hr);
    const b = C * Math.sin(hr);

    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

    const l = l_ ** 3;
    const m = m_ ** 3;
    const s = s_ ** 3;

    let r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    let b2 = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

    r = Math.min(1, Math.max(0, r));
    g = Math.min(1, Math.max(0, g));
    b2 = Math.min(1, Math.max(0, b2));

    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b2 * 255)})`;
  }

  replaceOklchColors(element: HTMLElement) {
    const all = element.querySelectorAll('*');

    all.forEach(el => {
      const style = getComputedStyle(el);

      ['color', 'backgroundColor', 'borderColor'].forEach(prop => {
        const value = style.getPropertyValue(prop);

        if (value.includes('oklch')) {
          const rgb = this.oklchToRgb(value);
          (el as HTMLElement).style.setProperty(prop, rgb, 'important');
        }
      });
    });
  }

  exportPDF() {
    const element = document.getElementById('cv-content');

    if (!element) {
      console.error('No se encontró el elemento #cv-content');
      return;
    }

    this.replaceOklchColors(element);

    html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('Curriculum_Vitae.pdf');
      this.toastr.success('CV almacenado');
    });
  }

  changeTemplate(event: any) {
    this.templateService.setTemplate(event.target.value);
    this.selectedTemplate = this.templateService.getTemplate();
  }

  changeTemplateById(id: string) {
    this.templateService.setTemplate(id);
    this.selectedTemplate = this.templateService.getTemplate();
  }
}