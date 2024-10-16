import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { OrdenDeTrabajoService } from '../Service/orden-de-trabajo.service';
import { OrdenDeTrabajo } from '../Model/OrdenDeTrabajo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-orden-de-trabajo',
  templateUrl: './orden-de-trabajo.component.html',
  styleUrls: ['./orden-de-trabajo.component.css']
})
export class OrdenDeTrabajoComponent implements OnInit {
  ordenDeTrabajo: OrdenDeTrabajo = {
    tipoDeOrden: '',
    codigoActivo: '',
    tipoActivo: '',
    edificio: '',
    pisoNivel: '',
    sector: '',
    observaciones: '',
    instruccionesDeTarea: '',
    tareas: [],
    fechaRealizacion: '',
    fechaImpresion: '',
    tiempoTotalUtilizado: '',
    username: ''
  };

  tiposDeOrden: string[] = ['Planificado', 'Planificado No Periódico', 'No Planificado'];
  tiposDeActivos: string[] = ['Iluminación', 'Aire Acondicionado', 'Radiador Calefacción', 'Puerta', 'Ventanas & Cortinas', 'Luces de Emergencia', 'Matafuego', 'Barandas y Escaleras', 'Tablero Eléctrico', 'Inodoro & Mochila', 'Mesada', 'Ventilador', 'NA', 'Puerta Emergencia', 'Ascensor', 'Cortina Enrollar Motor', 'NA', 'Termotanque', 'Calefactor', 'Caldera', 'Techos y Canaletas', 'NA', 'Balcones', 'Paneles Solares e Inversor', 'Portones', 'Generador Eléctrico', 'Bombas de Agua', 'Tanques de Agua', 'Rejillas & Desagues', 'Emergencia Alarma', 'Espacio Físico', 'Ducha', 'Cocheras', 'Escalera', 'NA', 'Cámara Desagüe', 'Cámara Septicas'];
  edificios: string[] = ['Laprida 651 - UTN FRVT', 'Laprida 648 - FAGDUT VT', 'Laprida 652 - ATEVEN', 'Castelli 501 - UTN // UCES'];
  pisosNiveles: string[] = ['Planta Baja', '1er. Piso', '2do. Piso', '3er. Piso', '4to. Piso', '5to. Piso', 'Nivel 0', 'Nivel Bajo 0', 'Techo', 'Entrepiso'];
  sectores: string[] = ['Aula 20', 'Aula Video Conferencia', 'Aula 19 - Lab. Informatica', 'Centro de Comunicaciones', 'Pasillo C', 'Pasillo D', 'Lab. Arquitectura', 'Escalera 4', 'Baños Mixtos', 'Baño Lab. Arquitectura', 'Aula 21', 'Aula 22', 'Aula 27', 'Aula 23', 'Aula 26', 'SUM', 'Aula 25', 'Pasillo E', 'Escalera 5', 'Escalera 3', 'Pasillo A', 'Escalera 1', 'Pasillo B', 'Escalera 2', 'Alumnado', 'Administración', 'Gabinete Ps.', 'Sec. Académica', 'Of. de Personal', 'Baño Hombre Pasillo B', 'Baño Dama Pasillo B', 'Baño Discapacitado Pasillo B', 'Cantina', 'Biblioteca', 'Sala de Lectura', 'Sec. Asuntos Estudiantiles', 'Dasuten', 'Aula 1', 'Baño Dama Pasillo E', 'Baño Hombre Pasillo D', 'Laboratorio de Suelos', 'Baño Discapacitado Pasillo C', 'Baño Hombre Pasillo C', 'Laboratorio de Materiales', 'Nave Laboratorios Civil', 'Pasillo A Nave Electromecánica', 'Pasillo B Nave Electromecánica', 'Laboratorio de Mecánica', 'Mantenimiento', 'GDE', 'Laboratorio de Ensayo de Motores', 'Metrología', 'Baño Hombre Nave Electro', 'Baño Dama Nave Electro', 'SUM ll', 'Acceso Calle La Heras', 'Hall Ingreso Calle Laprida', 'Sala de Consejo', 'Unidad Vinculación Tecnológica', 'Secretaría Extensión Universitaria', 'Área de Convenios', 'Secretaría Administrativa', 'Cursos de Capacitación', 'Decanato', 'Vice-Decanato', 'Secretaría de Decanato', 'Cocina Pasillo B', 'Depto. Ing. Electromecánica', 'Depto. Ing. Civil', 'Depto. Básicas', 'Laboratorio Química', 'Aula 11', 'Lab. Información Geográfica', 'Aula 10', 'Aula 14D', 'Aula 14C', 'Aula 14B', 'Aula 14A', 'Aula 15', 'Aula 16', 'Aula 17', 'Aula 13', 'Aula 13Bis', 'Escalera 6', 'Escalera 7', 'Escalera 8', 'Laboratorio Metalografía', 'Laboratorio Energías Renovables', 'Laboratorio Electricidad', 'Área Usos Múltiples', 'Aula 28', 'Aula 29', 'Aula 31', 'Pasillo SUM', 'Escalera 7', 'Calles Las Heras', 'Patio Interno', 'Pasillo Calle Las Heras', 'Estacionamiento', 'Patio Estacionamiento', 'Calle Laprida', 'Patio Cantina', 'Medición CEVT Laprida', 'Sala de Bombas'];

  ordenId: number | null = null;
  ordenMostrada: OrdenDeTrabajo | null = null;


  tiempos: string[] = [];

  @ViewChild('ordenModal') ordenModal!: TemplateRef<any>;


  constructor(private ordenDeTrabajoService: OrdenDeTrabajoService, private modalService: NgbModal) { }

  ngOnInit(): void {

this.generarTiempos();
   }

   generarTiempos(): void {
    const horasMax = 12; // Hasta 12 horas
    for (let horas = 0; horas <= horasMax; horas++) {
      for (let minutos of [0, 15, 30, 45]) {
        if (horas === 0 && minutos === 0) continue; // Omitimos 0:00
        let tiempo = horas > 0 ? `${horas} hora${horas > 1 ? 's' : ''}` : '';
        if (minutos > 0) tiempo += `${horas > 0 ? ' ' : ''}${minutos} min`;
        this.tiempos.push(tiempo.trim());
      }
    }
  }

  onSubmit() {
    this.ordenDeTrabajoService.crearOrden(this.ordenDeTrabajo).subscribe((respuesta) => {
      alert('Orden creada con éxito');
    });
  }

  mostrarOrden() {
    if (this.ordenId) {
      this.ordenDeTrabajoService.obtenerOrden(this.ordenId).subscribe((orden) => {
        this.ordenMostrada = orden;
        this.modalService.open(this.ordenModal);
      });
    }
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}

