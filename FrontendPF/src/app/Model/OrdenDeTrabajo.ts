export interface Tarea {
    id?: number;
    descripcion: string;
  }
  
  export interface OrdenDeTrabajo {
    id?: number;
    tipoDeOrden: string;
    codigoActivo: string;
    tipoActivo: string;
    edificio: string;
    pisoNivel: string;
    sector: string;
    observaciones: string;
    instruccionesDeTarea: string;
    tareas: Tarea[];
    fechaRealizacion: string;
    fechaImpresion: string;
    tiempoTotalUtilizado: string;
    username: string;
  }
  