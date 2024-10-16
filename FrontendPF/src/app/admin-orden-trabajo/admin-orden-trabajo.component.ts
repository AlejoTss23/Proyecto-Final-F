import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { OrdenDeTrabajoService } from '../Service/orden-de-trabajo.service';
import html2canvas from 'html2canvas';  // Necesitarás instalar esta dependencia
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-orden-trabajo',
  templateUrl: './admin-orden-trabajo.component.html',
  styleUrls: ['./admin-orden-trabajo.component.css']
})
export class AdminOrdenTrabajoComponent implements OnInit {
  ordenes: any[] = [];
  ordenSeleccionada: any = null;

  @ViewChild('ordenModal') ordenModal!: TemplateRef<any>;

  constructor(private ordenDeTrabajoService: OrdenDeTrabajoService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.obtenerOrdenes();
  }

  obtenerOrdenes() {
    this.ordenDeTrabajoService.listarOrdenes().subscribe((data) => {
      this.ordenes = data;
    });
  }

  abrirModal(orden: any): void {
    this.ordenSeleccionada = orden;
    this.modalService.open(this.ordenModal, { size: 'lg' });
  }

  cerrarModal(): void {
    this.modalService.dismissAll();
  }

  descargarImagen(ordenId: number | undefined): void {
    const elemento = document.getElementById(`orden-${ordenId}`);
    if (elemento) {
      html2canvas(elemento).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = `orden_${ordenId}.png`;
        link.click();
      });
    }
  }
}

