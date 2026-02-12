import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvService } from '../../services/cv.service';
import { CV } from '../../models/cv.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.html',
  styleUrls: ['./summary.css'],
})
export class SummaryComponent implements OnInit {

  // Inicializamos el CV para evitar errores de renderizado
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

  constructor(private cvService: CvService) {}

  ngOnInit(): void {
    this.cvService.cv$.subscribe(cv => {
      this.cv = cv;
      console.log('CV actualizado en SummaryComponent:', this.cv);
    });
  }

  clearCV() {
    this.cvService.resetCV();
  }

  exportPDF() {
    const element = document.getElementById('cv-content');

    if (!element) {
      console.error('No se encontró el elemento #cv-content');
      return;
    }
    

    html2canvas(element, { scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff' }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('Curriculum_Vitae.pdf');
    });
  }
}