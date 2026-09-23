import { FlowchartItem } from '../types';

export const FLOWCHARTS_DATA: FlowchartItem[] = [
  {
    id: 'df-gc-001',
    code: 'DF-GC-001',
    title: 'Flujograma Operativo Gate Control',
    category: 'Gate Control',
    date: 'Oficial • Versión 001',
    description: 'Control de acceso, pesaje en báscula, inspección física de precintos y validación documental de ingreso y salida en terminal.',
    lanes: [
      { id: 'conductor', name: 'Transportista / Conductor', color: '#0284c7' },
      { id: 'gate_in', name: 'Caseta Gate In', color: '#003B6F' },
      { id: 'bascula', name: 'Báscula y Pesaje', color: '#d97706' },
      { id: 'patio', name: 'Patio de Maniobras', color: '#059669' },
      { id: 'gate_out', name: 'Caseta Gate Out', color: '#475569' }
    ],
    nodes: [
      { id: 'gc-start', label: 'Llegada de camión a portería', type: 'start', laneId: 'conductor', x: 50, y: 70, description: 'Camión se presenta en caseta de acceso con guía o manifiesto.' },
      { id: 'gc-doc-rev', label: 'Revisión documental de conductor y unidad', type: 'task', laneId: 'gate_in', x: 230, y: 150, description: 'Cotejo de licencia de conducir, póliza de seguro y orden de ingreso.' },
      { id: 'gc-dec-doc', label: '¿Documentación conforme?', type: 'decision', laneId: 'gate_in', x: 420, y: 150, description: 'Validar si los datos coinciden con la cita en sistema.' },
      { id: 'gc-reject-in', label: 'Rechazo / Desvío a Zona Buffer', type: 'end', laneId: 'gate_in', x: 420, y: 20, description: 'Se rechaza ingreso y se solicita regularización en Buffer.' },
      { id: 'gc-pesaje-in', label: 'Pesaje inicial bruto en báscula', type: 'task', laneId: 'bascula', x: 590, y: 230, description: 'Registro de peso por eje y tara en sistema informático.' },
      { id: 'gc-insp-sello', label: 'Inspección de sellos y precintos aduaneros', type: 'task', laneId: 'gate_in', x: 770, y: 150, description: 'Comprobación ocular y registro fotográfico del número de sello.' },
      { id: 'gc-asign-pos', label: 'Asignación de bahía / bloque en patio', type: 'task', laneId: 'patio', x: 960, y: 310, description: 'Control Room indica coordenadas para descarga o faena.' },
      { id: 'gc-faena-patio', label: 'Ejecución de faena en patio (descarga/porteo)', type: 'task', laneId: 'patio', x: 1150, y: 310, description: 'Reach Stacker o grúa horquilla ejecuta la operación.' },
      { id: 'gc-pesaje-out', label: 'Pesaje de salida en báscula', type: 'task', laneId: 'bascula', x: 1330, y: 230, description: 'Comprobación de tara final de la unidad tractora.' },
      { id: 'gc-gate-out', label: 'Emisión de comprobante Gate Out y salida', type: 'task', laneId: 'gate_out', x: 1510, y: 390, description: 'Firma de guía, entrega de ticket y apertura de barrera.' },
      { id: 'gc-end', label: 'Salida conforme del recinto', type: 'end', laneId: 'conductor', x: 1690, y: 70, description: 'El transporte abandona las instalaciones de Puerto Columbo.' }
    ],
    connections: [
      { from: 'gc-start', to: 'gc-doc-rev' },
      { from: 'gc-doc-rev', to: 'gc-dec-doc' },
      { from: 'gc-dec-doc', to: 'gc-pesaje-in', label: 'Sí' },
      { from: 'gc-dec-doc', to: 'gc-reject-in', label: 'No' },
      { from: 'gc-pesaje-in', to: 'gc-insp-sello' },
      { from: 'gc-insp-sello', to: 'gc-asign-pos' },
      { from: 'gc-asign-pos', to: 'gc-faena-patio' },
      { from: 'gc-faena-patio', to: 'gc-pesaje-out' },
      { from: 'gc-pesaje-out', to: 'gc-gate-out' },
      { from: 'gc-gate-out', to: 'gc-end' }
    ],
    subprocesses: [
      {
        name: 'Ingreso y Salida de Carga',
        description: 'Circuito general de control de camiones con carga general o contenedores.',
        steps: [
          'Verificación de patente de camión y contenedor en sistema.',
          'Lectura de precintos de seguridad.',
          'Pesaje automatizado en báscula de entrada.',
          'Entrega de ticket de ingreso numerado.'
        ]
      },
      {
        name: 'Proceso de Revisión',
        description: 'Inspección de daños previos y discrepancias en sellos.',
        steps: [
          'Identificación de golpes o averías estructurales.',
          'Emisión de acta de avería si corresponde.',
          'Notificación electrónica a Customer Service.'
        ]
      },
      {
        name: 'Control Gate Out',
        description: 'Salida expedita con resguardo de seguridad aduanera.',
        steps: [
          'Verificación de timbres aduaneros y autorización de retiro.',
          'Pesaje de salida para cálculo de peso neto transportado.',
          'Firma digital y despacho final.'
        ]
      }
    ]
  },
  {
    id: 'df-cdoc-001',
    code: 'DF-CDOC-001',
    title: 'Flujograma Control de Documentos',
    category: 'Control Documentos',
    date: 'Oficial • Versión 002',
    description: 'Validación de manifiestos, facturación, visación aduanera y emisión de informes de faltas y sobras.',
    lanes: [
      { id: 'agencia', name: 'Agencia de Aduana / Cliente', color: '#0284c7' },
      { id: 'recepcion', name: 'Recepción y Coordinación Documental', color: '#003B6F' },
      { id: 'visacion', name: 'Visación y Control', color: '#d97706' },
      { id: 'facturacion', name: 'Facturación y Liquidación', color: '#059669' }
    ],
    nodes: [
      { id: 'cd-start', label: 'Recepción de expediente documental', type: 'start', laneId: 'agencia', x: 50, y: 70, description: 'Llegada de guías de despacho, conocimientos de embarque (B/L) y resoluciones.' },
      { id: 'cd-ingreso', label: 'Registro de antecedentes en sistema central', type: 'task', laneId: 'recepcion', x: 230, y: 150, description: 'Ingreso de correlativo y asignación de carpeta operativa digital.' },
      { id: 'cd-cotejo', label: 'Cotejo contra manifiesto naviero y tarja', type: 'task', laneId: 'recepcion', x: 420, y: 150, description: 'Comparación de bultos declarados versus tarjados en terreno.' },
      { id: 'cd-dec-fs', label: '¿Existen Faltas o Sobras (FS)?', type: 'decision', laneId: 'recepcion', x: 610, y: 150, description: 'Determinación de inconsistencias en peso o número de bultos.' },
      { id: 'cd-acta-fs', label: 'Emisión de Informe de Faltas y Sobras', type: 'task', laneId: 'visacion', x: 610, y: 230, description: 'Notificación inmediata a compañía naviera y aduanas.' },
      { id: 'cd-visacion', label: 'Visación y aprobación aduanera', type: 'task', laneId: 'visacion', x: 800, y: 230, description: 'Revisión de levante aduanero y permisos sectoriales.' },
      { id: 'cd-dec-vis', label: '¿Visación aprobada?', type: 'decision', laneId: 'visacion', x: 990, y: 230, description: 'Confirmar si aduana autoriza despacho o dispone retención.' },
      { id: 'cd-hold', label: 'Retención de carga y aviso a cliente', type: 'end', laneId: 'agencia', x: 990, y: 70, description: 'Carga queda retenida hasta subsanar reparos.' },
      { id: 'cd-fact', label: 'Cálculo de tarifas y liquidación de servicios', type: 'task', laneId: 'facturacion', x: 1180, y: 310, description: 'Aplicación de tarifario comercial vigente y emisión de factura.' },
      { id: 'cd-liberacion', label: 'Autorización de despacho final en sistema', type: 'end', laneId: 'facturacion', x: 1370, y: 310, description: 'Expediente cerrado y listo para entrega física de la mercancía.' }
    ],
    connections: [
      { from: 'cd-start', to: 'cd-ingreso' },
      { from: 'cd-ingreso', to: 'cd-cotejo' },
      { from: 'cd-cotejo', to: 'cd-dec-fs' },
      { from: 'cd-dec-fs', to: 'cd-acta-fs', label: 'Sí' },
      { from: 'cd-dec-fs', to: 'cd-visacion', label: 'No' },
      { from: 'cd-acta-fs', to: 'cd-visacion' },
      { from: 'cd-visacion', to: 'cd-dec-vis' },
      { from: 'cd-dec-vis', to: 'cd-fact', label: 'Aprobado' },
      { from: 'cd-dec-vis', to: 'cd-hold', label: 'Rechazado' },
      { from: 'cd-fact', to: 'cd-liberacion' }
    ],
    subprocesses: [
      {
        name: 'Recepción y Coordinación Documental',
        description: 'Revisión exhaustiva de guías y documentos aduaneros.',
        steps: [
          'Verificación de timbres del despachador.',
          'Carga de datos a la plataforma central.',
          'Asignación de estatus documental.'
        ]
      },
      {
        name: 'Informe de Faltas y Sobras',
        description: 'Protocolo formal ante diferencias físicas de inventario.',
        steps: [
          'Elaboración de acta con firma de supervisor.',
          'Archivo digital de respaldo con fotografía.',
          'Notificación al área comercial.'
        ]
      }
    ]
  },
  {
    id: 'df-sag-001',
    code: 'DF-SAG-001',
    title: 'Flujograma Inspección y Despacho SAG',
    category: 'SAG',
    date: 'Oficial • Vigente',
    description: 'Protocolo sanitario coordinado con el Servicio Agrícola y Ganadero para aforo fitozoosanitario.',
    lanes: [
      { id: 'agencia', name: 'Agencia de Aduana', color: '#0284c7' },
      { id: 'comercial', name: 'Personal Comercial Columbo', color: '#003B6F' },
      { id: 'maquinaria', name: 'Operador Reach Stacker', color: '#d97706' },
      { id: 'sag', name: 'Inspector Oficial SAG', color: '#059669' }
    ],
    nodes: [
      { id: 'sag-start', label: 'Recepción solicitud de aforo SAG', type: 'start', laneId: 'agencia', x: 50, y: 70, description: 'Llegada de aviso de inspección física fitosanitaria.' },
      { id: 'sag-coord', label: 'Programación de cita y validación de antecedentes', type: 'task', laneId: 'comercial', x: 230, y: 150, description: 'Verificación de llegada del inspector y asignación de turno.' },
      { id: 'sag-mov-pos', label: 'Posicionamiento de unidad en andén de aforo', type: 'task', laneId: 'maquinaria', x: 420, y: 230, description: 'Grúa traslada contenedor a zona techada de inspección SAG.' },
      { id: 'sag-corte-sello', label: 'Verificación y corte de sello en presencia SAG', type: 'task', laneId: 'sag', x: 610, y: 310, description: 'Inspector coteja número de precinto antes de la apertura.' },
      { id: 'sag-muestreo', label: 'Apertura, revisión física y toma de muestras', type: 'task', laneId: 'sag', x: 800, y: 310, description: 'Inspección de madera, productos agrícolas o muestras analíticas.' },
      { id: 'sag-dec-conf', label: '¿Resultado conforme?', type: 'decision', laneId: 'sag', x: 990, y: 310, description: 'Evaluación del dictamen emitido por el inspector SAG.' },
      { id: 'sag-interdiccion', label: 'Aplicación de medidas / Interdicción SAG', type: 'end', laneId: 'sag', x: 990, y: 390, description: 'Fumigación obligatoria, retención preventiva o reembarque.' },
      { id: 'sag-nuevo-sello', label: 'Colocación de sello oficial SAG y cierre', type: 'task', laneId: 'sag', x: 1180, y: 310, description: 'Precintado con sello verde SAG y registro en acta.' },
      { id: 'sag-acta', label: 'Firma de acta de inspección favorable', type: 'task', laneId: 'comercial', x: 1370, y: 150, description: 'Entrega de copia timbrada a la agencia de aduana.' },
      { id: 'sag-liberacion', label: 'Liberación y despacho autorizado', type: 'end', laneId: 'agencia', x: 1550, y: 70, description: 'Unidad autorizada para retiro o consolidación.' }
    ],
    connections: [
      { from: 'sag-start', to: 'sag-coord' },
      { from: 'sag-coord', to: 'sag-mov-pos' },
      { from: 'sag-mov-pos', to: 'sag-corte-sello' },
      { from: 'sag-corte-sello', to: 'sag-muestreo' },
      { from: 'sag-muestreo', to: 'sag-dec-conf' },
      { from: 'sag-dec-conf', to: 'sag-nuevo-sello', label: 'Conforme' },
      { from: 'sag-dec-conf', to: 'sag-interdiccion', label: 'No conforme' },
      { from: 'sag-nuevo-sello', to: 'sag-acta' },
      { from: 'sag-acta', to: 'sag-liberacion' }
    ],
    subprocesses: [
      {
        name: 'Recepción de Solicitud SAG',
        description: 'Validación de requerimiento fitozoosanitario.',
        steps: [
          'Ingreso de orden de inspección.',
          'Notificación a cuadrilla de patio.',
          'Reserva de rampa de aforo.'
        ]
      },
      {
        name: 'Proceso de Inspección Fitosanitaria',
        description: 'Ejecución del protocolo sanitario oficial.',
        steps: [
          'Apertura controlada de compuertas.',
          'Muestreo biológico o de embalajes de madera.',
          'Emisión de resolución de levante.'
        ]
      }
    ]
  },
  {
    id: 'df-pf-001',
    code: 'DF-PF-001',
    title: 'Flujograma Porteos Full',
    category: 'Almacén Patio',
    date: 'Oficial • Vigente',
    description: 'Gestión de traslados de contenedores llenos desde muelles de STI / DP World hacia terminal extraportuario.',
    lanes: [
      { id: 'cliente', name: 'Cliente / Naviera', color: '#0284c7' },
      { id: 'coord_porteo', name: 'Coordinación Porteos Columbo', color: '#003B6F' },
      { id: 'transportista', name: 'Transportista / Chofer', color: '#d97706' },
      { id: 'puerto', name: 'Terminal Portuario / Patio', color: '#059669' }
    ],
    nodes: [
      { id: 'pf-start', label: 'Solicitud de servicio de porteo full', type: 'start', laneId: 'cliente', x: 50, y: 70, description: 'Cliente solicita retiro de unidades con manifiesto arribado.' },
      { id: 'pf-plan', label: 'Programación de naves y corte de stack', type: 'task', laneId: 'coord_porteo', x: 230, y: 150, description: 'Análisis de ETA, volumen de contenedores y citas de retiro.' },
      { id: 'pf-asign-flota', label: 'Asignación de flota de camiones de porteo', type: 'task', laneId: 'coord_porteo', x: 420, y: 150, description: 'Designación de tractocamiones con choferes habilitados.' },
      { id: 'pf-retiro-pto', label: 'Ingreso a muelle y retiro de contenedor', type: 'task', laneId: 'puerto', x: 610, y: 310, description: 'Carga sobre chasis en STI / DPW y verificación de sello.' },
      { id: 'pf-dec-imo', label: '¿Contenedor con carga IMO?', type: 'decision', laneId: 'coord_porteo', x: 800, y: 150, description: 'Verificación de rótulos de mercancía peligrosa.' },
      { id: 'pf-protocolo-imo', label: 'Activación de protocolo de escolta IMO', type: 'task', laneId: 'transportista', x: 800, y: 230, description: 'Ruta preferente y comprobación de ficha de emergencia.' },
      { id: 'pf-traslado', label: 'Traslado seguro por vías habilitadas', type: 'task', laneId: 'transportista', x: 990, y: 230, description: 'Velocidad máxima 50 km/h y seguimiento por GPS.' },
      { id: 'pf-ingreso-columbo', label: 'Ingreso a Gate y stacking en patio Columbo', type: 'task', laneId: 'puerto', x: 1180, y: 310, description: 'Pesaje, comprobación de sellos y acopio seguro.' },
      { id: 'pf-end', label: 'Contenedor full disponible para cliente', type: 'end', laneId: 'coord_porteo', x: 1370, y: 150, description: 'Actualización en sistema de trazabilidad y reporte al cliente.' }
    ],
    connections: [
      { from: 'pf-start', to: 'pf-plan' },
      { from: 'pf-plan', to: 'pf-asign-flota' },
      { from: 'pf-asign-flota', to: 'pf-retiro-pto' },
      { from: 'pf-retiro-pto', to: 'pf-dec-imo' },
      { from: 'pf-dec-imo', to: 'pf-protocolo-imo', label: 'Sí' },
      { from: 'pf-dec-imo', to: 'pf-traslado', label: 'No' },
      { from: 'pf-protocolo-imo', to: 'pf-traslado' },
      { from: 'pf-traslado', to: 'pf-ingreso-columbo' },
      { from: 'pf-ingreso-columbo', to: 'pf-end' }
    ],
    subprocesses: [
      {
        name: 'Retiro de Contenedores Full desde Puerto',
        description: 'Ciclo de extracción de unidades del terminal portuario.',
        steps: [
          'Recepción de planillas de desembarque.',
          'Solicitud de citas en portal portuario.',
          'Verificación de pago de aforos y almacenajes.',
          'Retiro y traslado inmediato a Columbo.'
        ]
      },
      {
        name: 'Bloqueo y Regularización',
        description: 'Gestión ante discrepancias de sello o peso.',
        steps: [
          'Emisión de reporte de no conformidad.',
          'Bloqueo informático en el sistema TOS.',
          'Desbloqueo tras visto bueno naviero.'
        ]
      }
    ]
  },
  {
    id: 'df-pv-001',
    code: 'DF-PV-001',
    title: 'Flujograma Porteos Vacíos & Demurrage',
    category: 'Almacén Patio',
    date: 'Oficial • Vigente',
    description: 'Control de retiro, inspección estructural IICL, devolución de unidades vacías y seguimiento de demurrages.',
    lanes: [
      { id: 'cliente', name: 'Cliente / Importador', color: '#0284c7' },
      { id: 'porteo_vacios', name: 'Coordinación Porteos Vacíos', color: '#003B6F' },
      { id: 'cs', name: 'Customer Service', color: '#d97706' },
      { id: 'transportista', name: 'Transportista y Depósito', color: '#059669' }
    ],
    nodes: [
      { id: 'pv-start', label: 'Solicitud de retiro de vacío por cliente', type: 'start', laneId: 'cliente', x: 50, y: 70, description: 'Recepción de booking para retiro de unidad vacía.' },
      { id: 'pv-val-pago', label: 'Verificación de pago Gate In y depósito', type: 'task', laneId: 'porteo_vacios', x: 230, y: 150, description: 'Consulta en portales de depósitos extraportuarios.' },
      { id: 'pv-dec-pago', label: '¿Pago registrado?', type: 'decision', laneId: 'porteo_vacios', x: 420, y: 150, description: 'Verificar comprobante bancario o línea de crédito.' },
      { id: 'pv-req-pago', label: 'Solicitar regularización a Customer Service', type: 'task', laneId: 'cs', x: 420, y: 230, description: 'Gestión con cliente para liberar retención comercial.' },
      { id: 'pv-agendamiento', label: 'Agendamiento y confirmación de booking', type: 'task', laneId: 'porteo_vacios', x: 610, y: 150, description: 'Reserva de turno en depósito asignado por naviera.' },
      { id: 'pv-insp-iicl', label: 'Inspección física y clasificación IICL', type: 'task', laneId: 'transportista', x: 800, y: 310, description: 'Revisión de paredes, techo, esquineros y piso de madera.' },
      { id: 'pv-dec-danos', label: '¿Presenta daños no autorizados?', type: 'decision', laneId: 'transportista', x: 990, y: 310, description: 'Evaluación técnica de condición del contenedor.' },
      { id: 'pv-eir-dano', label: 'Emisión de EIR de avería y foto-registro', type: 'task', laneId: 'transportista', x: 990, y: 390, description: 'Constancia de daño previo para eximir al cliente.' },
      { id: 'pv-devolucion', label: 'Devolución de contenedor a depósito naviero', type: 'task', laneId: 'transportista', x: 1180, y: 310, description: 'Ingreso al depósito y entrega de guía timbrada.' },
      { id: 'pv-demurrage-ctrl', label: 'Cálculo de días libres y control Demurrage', type: 'task', laneId: 'porteo_vacios', x: 1370, y: 150, description: 'Monitoreo de vencimiento para evitar sobrecostos al cliente.' },
      { id: 'pv-end', label: 'Cierre de ciclo de contenedor vacío', type: 'end', laneId: 'cliente', x: 1550, y: 70, description: 'Unidad devuelta y notificada formalmente a naviera.' }
    ],
    connections: [
      { from: 'pv-start', to: 'pv-val-pago' },
      { from: 'pv-val-pago', to: 'pv-dec-pago' },
      { from: 'pv-dec-pago', to: 'pv-agendamiento', label: 'Sí' },
      { from: 'pv-dec-pago', to: 'pv-req-pago', label: 'No' },
      { from: 'pv-req-pago', to: 'pv-agendamiento' },
      { from: 'pv-agendamiento', to: 'pv-insp-iicl' },
      { from: 'pv-insp-iicl', to: 'pv-dec-danos' },
      { from: 'pv-dec-danos', to: 'pv-eir-dano', label: 'Con daño' },
      { from: 'pv-dec-danos', to: 'pv-devolucion', label: 'Sin daño' },
      { from: 'pv-eir-dano', to: 'pv-devolucion' },
      { from: 'pv-devolucion', to: 'pv-demurrage-ctrl' },
      { from: 'pv-demurrage-ctrl', to: 'pv-end' }
    ],
    subprocesses: [
      {
        name: 'Retiro de Contenedor Vacío',
        description: 'Gestión con agencias navieras para extracción de unidades vacías.',
        steps: [
          'Consulta en sistema XPS.',
          'Asignación de chofer con número de folio.',
          'Retiro físico desde depósito portuario.'
        ]
      },
      {
        name: 'Control Diario de Demurrage',
        description: 'Prevención de multas por retención excesiva de contenedores.',
        steps: [
          'Revisión diaria del reporte de estado.',
          'Detección de presunción de abandono.',
          'Alerta temprana a gerencia de operaciones.'
        ]
      }
    ]
  },
  {
    id: 'df-buf-001',
    code: 'DF-BUF-001',
    title: 'Flujograma Zona Buffer de Camiones',
    category: 'Buffer',
    date: 'Oficial • Vigente',
    description: 'Gestión de flujo, ordenamiento en zona de amortiguación, emisión de ticket QR y trazabilidad de camiones.',
    lanes: [
      { id: 'transportista', name: 'Transportista', color: '#0284c7' },
      { id: 'buffer', name: 'Control Zona Buffer', color: '#003B6F' },
      { id: 'gate', name: 'Gate Control Principal', color: '#d97706' }
    ],
    nodes: [
      { id: 'buf-start', label: 'Llegada de camión a zona Buffer', type: 'start', laneId: 'transportista', x: 50, y: 70, description: 'Camión arriba antes de su ventana horaria o a la espera de cupo.' },
      { id: 'buf-rev-web', label: 'Verificación de programación en portal web', type: 'task', laneId: 'buffer', x: 230, y: 150, description: 'Comprobación de patente y número de contenedor en sistema.' },
      { id: 'buf-dec-reg', label: '¿Transporte registrado en sistema?', type: 'decision', laneId: 'buffer', x: 420, y: 150, description: 'Determinar si cuenta con reserva operativa activa.' },
      { id: 'buf-standby', label: 'Mantener camión en bahía de espera Buffer', type: 'task', laneId: 'buffer', x: 420, y: 230, description: 'Espera de autorización de Customer Service o regularización.' },
      { id: 'buf-habilita', label: 'Habilitar camión para flujo operativo', type: 'task', laneId: 'buffer', x: 610, y: 150, description: 'Asignación de prioridad en sistema de llamadas.' },
      { id: 'buf-qr', label: 'Impresión y entrega de ticket QR de turno', type: 'task', laneId: 'buffer', x: 800, y: 150, description: 'Entrega de voucher con código QR para paso expedito.' },
      { id: 'buf-dir-gate', label: 'Dirigirse a caseta de Gate Control', type: 'task', laneId: 'transportista', x: 990, y: 70, description: 'Camión avanza por carril segregado hacia portería.' },
      { id: 'buf-scan-qr', label: 'Escaneo de QR en Gate Control', type: 'task', laneId: 'gate', x: 1180, y: 230, description: 'Lectura automatizada para apertura rápida de barrera.' },
      { id: 'buf-dec-qr', label: '¿QR válido y vigente?', type: 'decision', laneId: 'gate', x: 1370, y: 230, description: 'Validación del token de seguridad del ticket.' },
      { id: 'buf-ingreso-ok', label: 'Ingreso autorizado a terminal Columbo', type: 'end', laneId: 'gate', x: 1560, y: 230, description: 'Camión ingresa a pesaje y descarga sin esperas viales.' }
    ],
    connections: [
      { from: 'buf-start', to: 'buf-rev-web' },
      { from: 'buf-rev-web', to: 'buf-dec-reg' },
      { from: 'buf-dec-reg', to: 'buf-habilita', label: 'Sí' },
      { from: 'buf-dec-reg', to: 'buf-standby', label: 'No' },
      { from: 'buf-standby', to: 'buf-habilita' },
      { from: 'buf-habilita', to: 'buf-qr' },
      { from: 'buf-qr', to: 'buf-dir-gate' },
      { from: 'buf-dir-gate', to: 'buf-scan-qr' },
      { from: 'buf-scan-qr', to: 'buf-dec-qr' },
      { from: 'buf-dec-qr', to: 'buf-ingreso-ok', label: 'Válido' }
    ],
    subprocesses: [
      {
        name: 'Recepción y Validación en Buffer',
        description: 'Recepción previa de unidades pesadas fuera del recinto portuario.',
        steps: [
          'Verificación de patente en pórtico.',
          'Chequeo de cita de descarga.',
          'Emisión de turno digital.'
        ]
      },
      {
        name: 'Derivación Operativa y Trazabilidad',
        description: 'Llamado dinámico de camiones para evitar congestión vial.',
        steps: [
          'Aviso en pantalla o radio.',
          'Paso expedito por carril preferente.',
          'Cierre de estadía en Buffer.'
        ]
      }
    ]
  },
  {
    id: 'df-cfs-001',
    code: 'DF-CFS-001',
    title: 'Flujograma Operaciones CFS & Bodega',
    category: 'CFS',
    date: 'Oficial • Vigente',
    description: 'Consolidación, desconsolidación de cargas LCL/FCL, tarjado físico, almacenamiento en racks y despacho.',
    lanes: [
      { id: 'cs', name: 'Customer Service', color: '#0284c7' },
      { id: 'cfs', name: 'Cuadrilla y Supervisor CFS', color: '#003B6F' },
      { id: 'bodega', name: 'Personal de Bodega', color: '#d97706' },
      { id: 'transportista', name: 'Transportista / Cliente', color: '#059669' }
    ],
    nodes: [
      { id: 'cfs-start', label: 'Llegada de contenedor asignado a CFS', type: 'start', laneId: 'cfs', x: 50, y: 150, description: 'Contenedor posicionado en rampa o bahía de trabajo CFS.' },
      { id: 'cfs-corte-precinto', label: 'Verificación y corte de sello de origen', type: 'task', laneId: 'cfs', x: 230, y: 150, description: 'Cotejo contra conocimiento de embarque.' },
      { id: 'cfs-descarga-tarja', label: 'Desconsolidación y tarja física minuciosa', type: 'task', laneId: 'cfs', x: 420, y: 150, description: 'Conteo de bultos, medición de dimensiones y control de embalaje.' },
      { id: 'cfs-dec-dano', label: '¿Carga con daño o avería?', type: 'decision', laneId: 'cfs', x: 610, y: 150, description: 'Detección de roturas, derrames o humedad.' },
      { id: 'cfs-acta-averia', label: 'Emisión de tarja de avería con fotos', type: 'task', laneId: 'cfs', x: 610, y: 230, description: 'Notificación urgente a agencia y aseguradora.' },
      { id: 'cfs-clasif', label: 'Etiquetado con código de barras correlativo', type: 'task', laneId: 'bodega', x: 800, y: 230, description: 'Adhesión de etiqueta para trazabilidad WMS.' },
      { id: 'cfs-racks', label: 'Almacenamiento en racks y estanterías', type: 'task', laneId: 'bodega', x: 990, y: 230, description: 'Ubicación física respetando carga máxima de estante.' },
      { id: 'cfs-orden-despacho', label: 'Recepción de orden de retiro y visación', type: 'task', laneId: 'cs', x: 1180, y: 70, description: 'Autorización comercial y aduanera de entrega.' },
      { id: 'cfs-picking', label: 'Picking y preparación de carga para entrega', type: 'task', laneId: 'bodega', x: 1370, y: 230, description: 'Extracción de mercadería con grúa horquilla.' },
      { id: 'cfs-end', label: 'Carga sobre camión y despacho conforme', type: 'end', laneId: 'transportista', x: 1550, y: 310, description: 'Firma de guía de despacho y salida de bodega.' }
    ],
    connections: [
      { from: 'cfs-start', to: 'cfs-corte-precinto' },
      { from: 'cfs-corte-precinto', to: 'cfs-descarga-tarja' },
      { from: 'cfs-descarga-tarja', to: 'cfs-dec-dano' },
      { from: 'cfs-dec-dano', to: 'cfs-acta-averia', label: 'Sí' },
      { from: 'cfs-dec-dano', to: 'cfs-clasif', label: 'No' },
      { from: 'cfs-acta-averia', to: 'cfs-clasif' },
      { from: 'cfs-clasif', to: 'cfs-racks' },
      { from: 'cfs-racks', to: 'cfs-orden-despacho' },
      { from: 'cfs-orden-despacho', to: 'cfs-picking' },
      { from: 'cfs-picking', to: 'cfs-end' }
    ],
    subprocesses: [
      {
        name: 'Recepción de Carga Comercial',
        description: 'Ingreso directo desde contenedor o camión de importación.',
        steps: [
          'Verificación de bultos y marcas.',
          'Emisión de comprobante de ingreso.',
          'Ingreso al software de bodega.'
        ]
      },
      {
        name: 'Almacenaje y Despacho',
        description: 'Conservación segura y entrega oportuna.',
        steps: [
          'Segregación por tipo de mercadería.',
          'Revisión contra guía de retiro autorizada.',
          'Firma de conformidad de transportista.'
        ]
      }
    ]
  },
  {
    id: 'df-ref-001',
    code: 'DF-REF-001',
    title: 'Flujograma Gestión Unidades Reefer',
    category: 'Almacén Patio',
    date: 'Oficial • Vigente',
    description: 'Conexión eléctrica, verificación de set point de temperatura, control de alarmas y monitoreo 24/7 de reefers.',
    lanes: [
      { id: 'porteo', name: 'Porteo y Patio', color: '#0284c7' },
      { id: 'reefer_tech', name: 'Técnico / Encargado Reefer', color: '#003B6F' },
      { id: 'control_room', name: 'Control Room', color: '#d97706' },
      { id: 'cs', name: 'Customer Service', color: '#059669' }
    ],
    nodes: [
      { id: 'ref-start', label: 'Ingreso de contenedor refrigerado a patio', type: 'start', laneId: 'porteo', x: 50, y: 70, description: 'Unidad se posiciona de inmediato en torre de conexión reefer.' },
      { id: 'ref-conexion', label: 'Conexión a red eléctrica industrial 440V', type: 'task', laneId: 'reefer_tech', x: 230, y: 150, description: 'Inspección de enchufe y cable antes de energizar.' },
      { id: 'ref-setpoint', label: 'Verificación de set point documental vs display', type: 'task', laneId: 'reefer_tech', x: 420, y: 150, description: 'Cotejo estricto de temperatura, ventilación y humedad.' },
      { id: 'ref-dec-temp', label: '¿Display coincide con set point?', type: 'decision', laneId: 'reefer_tech', x: 610, y: 150, description: 'Comprobación de temperatura solicitada por exportador.' },
      { id: 'ref-alarma', label: 'Activación de protocolo técnico ante alarmas', type: 'task', laneId: 'reefer_tech', x: 610, y: 230, description: 'Revisión por técnico frigorista especializado.' },
      { id: 'ref-monitoreo', label: 'Monitoreo periódico y planilla digital', type: 'task', laneId: 'reefer_tech', x: 800, y: 150, description: 'Toma de lectura cada 4 horas con registro en sistema.' },
      { id: 'ref-reporte', label: 'Emisión de reporte diario de temperaturas', type: 'task', laneId: 'control_room', x: 990, y: 230, description: 'Envío de resumen consolidado a Customer Service y naviera.' },
      { id: 'ref-despacho', label: 'Desconexión controlada previa a despacho', type: 'task', laneId: 'reefer_tech', x: 1180, y: 150, description: 'Desenergizar unidad, enrollar cable en caja de guarda.' },
      { id: 'ref-end', label: 'Despacho con temperatura controlada', type: 'end', laneId: 'cs', x: 1370, y: 310, description: 'Salida de contenedor reefer rumbo a nave o planta de cliente.' }
    ],
    connections: [
      { from: 'ref-start', to: 'ref-conexion' },
      { from: 'ref-conexion', to: 'ref-setpoint' },
      { from: 'ref-setpoint', to: 'ref-dec-temp' },
      { from: 'ref-dec-temp', to: 'ref-monitoreo', label: 'Coincide' },
      { from: 'ref-dec-temp', to: 'ref-alarma', label: 'Discrepancia' },
      { from: 'ref-alarma', to: 'ref-monitoreo' },
      { from: 'ref-monitoreo', to: 'ref-reporte' },
      { from: 'ref-reporte', to: 'ref-despacho' },
      { from: 'ref-despacho', to: 'ref-end' }
    ],
    subprocesses: [
      {
        name: 'Conexión y Puesta en Marcha',
        description: 'Energización de unidades frigoríficas con seguridad técnica.',
        steps: [
          'Comprobación de voltaje.',
          'Arranque del compresor.',
          'Validación de gases refrigerantes.'
        ]
      },
      {
        name: 'Monitoreo Continuo 24/7',
        description: 'Vigilancia permanente de la cadena de frío.',
        steps: [
          'Rondas técnicas cada 4 horas.',
          'Detección temprana de ciclos de descongelamiento (defrost).',
          'Notificación en tiempo real ante cortes eléctricos.'
        ]
      }
    ]
  },
  {
    id: 'df-cr-001',
    code: 'DF-CR-001',
    title: 'Flujograma Control Room & Stacking',
    category: 'Control Room',
    date: 'Oficial • Vigente',
    description: 'Gestión satelital de patio, cámaras CCTV, asignación de tareas a Reach Stackers y despacho en tiempo real.',
    lanes: [
      { id: 'gate', name: 'Gate In / Out', color: '#0284c7' },
      { id: 'control_room', name: 'Operador Control Room', color: '#003B6F' },
      { id: 'grua', name: 'Operador Reach Stacker / Grúa', color: '#d97706' },
      { id: 'stacking', name: 'Stacking y Despacho', color: '#059669' }
    ],
    nodes: [
      { id: 'cr-start', label: 'Aviso de ingreso de unidad a terminal', type: 'start', laneId: 'gate', x: 50, y: 70, description: 'Gate informa ingreso de contenedor mediante sistema informático.' },
      { id: 'cr-consulta-baroti', label: 'Consulta de plano de estiba (Baroti) en TOS', type: 'task', laneId: 'control_room', x: 230, y: 150, description: 'Identificación de bahías disponibles según naviera y tipo.' },
      { id: 'cr-dec-ubi', label: '¿Existe ubicación asignada en patio?', type: 'decision', laneId: 'control_room', x: 420, y: 150, description: 'Comprobación de espacio físico y restricciones de altura.' },
      { id: 'cr-reasignar', label: 'Planificación de nueva posición en bloque', type: 'task', laneId: 'control_room', x: 420, y: 230, description: 'Cálculo de centro de gravedad y seguridad estructural.' },
      { id: 'cr-radio', label: 'Transmisión radial de tarea a operador de grúa', type: 'task', laneId: 'control_room', x: 610, y: 150, description: 'Instrucción directa por canal radial asignado.' },
      { id: 'cr-ejec-mov', label: 'Movimiento y apilamiento físico en patio', type: 'task', laneId: 'grua', x: 800, y: 230, description: 'Reach Stacker toma contenedor y lo posiciona en torre.' },
      { id: 'cr-confirma-pos', label: 'Confirmación de coordenadas exactas en sistema', type: 'task', laneId: 'grua', x: 990, y: 230, description: 'Actualización en tiempo real de bahía, fila y nivel (Bay-Row-Tier).' },
      { id: 'cr-libera', label: 'Liberación de orden de trabajo en consola', type: 'task', laneId: 'stacking', x: 1180, y: 310, description: 'El sistema marca la faena como completada exitosamente.' },
      { id: 'cr-end', label: 'Unidad acopiada y trazable en 3D', type: 'end', laneId: 'control_room', x: 1370, y: 150, description: 'Posición visible en mapas de patio para futuras maniobras.' }
    ],
    connections: [
      { from: 'cr-start', to: 'cr-consulta-baroti' },
      { from: 'cr-consulta-baroti', to: 'cr-dec-ubi' },
      { from: 'cr-dec-ubi', to: 'cr-radio', label: 'Sí' },
      { from: 'cr-dec-ubi', to: 'cr-reasignar', label: 'No' },
      { from: 'cr-reasignar', to: 'cr-radio' },
      { from: 'cr-radio', to: 'cr-ejec-mov' },
      { from: 'cr-ejec-mov', to: 'cr-confirma-pos' },
      { from: 'cr-confirma-pos', to: 'cr-libera' },
      { from: 'cr-libera', to: 'cr-end' }
    ],
    subprocesses: [
      {
        name: 'Acopio de Contenedor',
        description: 'Recepción y coordinación de estiba en patio.',
        steps: [
          'Confirmación por Gate Control.',
          'Asignación en planilla digital.',
          'Notificación a operador Reach Stacker.'
        ]
      },
      {
        name: 'Movimiento y Despacho',
        description: 'Reubicación y carga sobre camión de salida.',
        steps: [
          'Búsqueda de coordenadas Baroti.',
          'Verificación de turno de camión.',
          'Retiro y posición sobre chasis.'
        ]
      }
    ]
  },
  {
    id: 'df-alp-001',
    code: 'DF-ALP-001',
    title: 'Flujograma Operaciones Almacén Patio',
    category: 'Almacén Patio',
    date: 'Oficial • Vigente',
    description: 'Gestión física de patios de acopio, segregación de cargas peligrosas IMO y optimización de grúas.',
    lanes: [
      { id: 'planificador', name: 'Planificador de Patio', color: '#0284c7' },
      { id: 'operador_grua', name: 'Operador de Grúa Reach Stacker', color: '#003B6F' },
      { id: 'supervisor', name: 'Supervisor de Seguridad y Patio', color: '#d97706' }
    ],
    nodes: [
      { id: 'alp-start', label: 'Inicio de jornada y plano de patio diario', type: 'start', laneId: 'planificador', x: 50, y: 70, description: 'Revisión de volumen proyectado de entradas y salidas.' },
      { id: 'alp-segregacion', label: 'Definición de zonas: Vacíos, Full e IMO', type: 'task', laneId: 'planificador', x: 230, y: 70, description: 'Resguardo de distancias de seguridad según código IMDG.' },
      { id: 'alp-inspeccion-vias', label: 'Inspección de vías de tránsito y despeje', type: 'task', laneId: 'supervisor', x: 420, y: 230, description: 'Comprobación de señalética, iluminación y ausencia de baches.' },
      { id: 'alp-dec-seguro', label: '¿Condiciones de patio óptimas?', type: 'decision', laneId: 'supervisor', x: 610, y: 230, description: 'Evaluación de seguridad operativa previa a faenas.' },
      { id: 'alp-subsanar', label: 'Medidas correctivas inmediatas', type: 'task', laneId: 'supervisor', x: 610, y: 310, description: 'Despeje de carril o reparación de luminarias.' },
      { id: 'alp-maniobras', label: 'Ejecución de estiba y shuffling de unidades', type: 'task', laneId: 'operador_grua', x: 800, y: 150, description: 'Apilamiento respetando altura máxima de 5 contenedores.' },
      { id: 'alp-registro', label: 'Cierre de ciclo y conciliación de inventario', type: 'end', laneId: 'planificador', x: 1020, y: 70, description: 'Inventario físico coincide 100% con registros del sistema.' }
    ],
    connections: [
      { from: 'alp-start', to: 'alp-segregacion' },
      { from: 'alp-segregacion', to: 'alp-inspeccion-vias' },
      { from: 'alp-inspeccion-vias', to: 'alp-dec-seguro' },
      { from: 'alp-dec-seguro', to: 'alp-maniobras', label: 'Seguro' },
      { from: 'alp-dec-seguro', to: 'alp-subsanar', label: 'Riesgo' },
      { from: 'alp-subsanar', to: 'alp-maniobras' },
      { from: 'alp-maniobras', to: 'alp-registro' }
    ],
    subprocesses: [
      {
        name: 'Segregación y Estiba Segura',
        description: 'Normas de apilamiento para prevenir accidentes.',
        steps: [
          'Stacking máximo de 5 alturas para vacíos.',
          'Stacking máximo de 3 a 4 alturas para contenedores llenos.',
          'Zona IMO aislada con contención de derrames.'
        ]
      }
    ]
  },
  {
    id: 'df-imp-exp-001',
    code: 'DF-IMP-EXP-001',
    title: 'Flujograma Importaciones & Exportaciones',
    category: 'Almacén Patio',
    date: 'Oficial • Vigente',
    description: 'Ciclo completo de importación (llegada y salida a cliente) y exportación (recepción, buffer y salida a puerto).',
    lanes: [
      { id: 'cliente', name: 'Cliente / Exportador / Importador', color: '#0284c7' },
      { id: 'cs', name: 'Customer Service Columbo', color: '#003B6F' },
      { id: 'patio', name: 'Almacén Patio y Báscula', color: '#d97706' },
      { id: 'puerto', name: 'Terminal Portuario (STI / DPW)', color: '#059669' }
    ],
    nodes: [
      { id: 'ie-start', label: 'Aviso de arribo o solicitud de exportación', type: 'start', laneId: 'cliente', x: 50, y: 70, description: 'Activación del flujo comercial para importación o exportación.' },
      { id: 'ie-analisis', label: 'Validación de reservas de stack y cut-off', type: 'task', laneId: 'cs', x: 230, y: 150, description: 'Coordinación con terminales marítimos y aduanas.' },
      { id: 'ie-recepcion', label: 'Recepción física y pesaje en patio Columbo', type: 'task', laneId: 'patio', x: 420, y: 230, description: 'Registro de VGM (Verified Gross Mass) y tarja de precintos.' },
      { id: 'ie-dec-tipo', label: '¿Operación de Importación o Exportación?', type: 'decision', laneId: 'cs', x: 610, y: 150, description: 'Bifurcación según régimen aduanero de la faena.' },
      { id: 'ie-imp-despacho', label: 'Despacho a cliente final / planta destino', type: 'task', laneId: 'cliente', x: 800, y: 70, description: 'Salida de contenedor de importación tras levante aduanero.' },
      { id: 'ie-exp-embarque', label: 'Traslado especial a muelle para embarque', type: 'task', laneId: 'puerto', x: 800, y: 310, description: 'Entrega en muelle STI / DPW dentro de ventana de stacking.' },
      { id: 'ie-end-imp', label: 'Importación completada conforme', type: 'end', laneId: 'cliente', x: 1020, y: 70, description: 'Carga recibida en destino.' },
      { id: 'ie-end-exp', label: 'Exportación embarcada en buque', type: 'end', laneId: 'puerto', x: 1020, y: 310, description: 'Contenedor cargado a bordo de la nave.' }
    ],
    connections: [
      { from: 'ie-start', to: 'ie-analisis' },
      { from: 'ie-analisis', to: 'ie-recepcion' },
      { from: 'ie-recepcion', to: 'ie-dec-tipo' },
      { from: 'ie-dec-tipo', to: 'ie-imp-despacho', label: 'Importación' },
      { from: 'ie-dec-tipo', to: 'ie-exp-embarque', label: 'Exportación' },
      { from: 'ie-imp-despacho', to: 'ie-end-imp' },
      { from: 'ie-exp-embarque', to: 'ie-end-exp' }
    ],
    subprocesses: [
      {
        name: 'Almacén de Importación',
        description: 'Llegada desde puerto y posterior despacho a clientes.',
        steps: [
          'Arribo de contenedores desde puerto.',
          'Verificación documental y desaduanamiento.',
          'Despacho y retiro por transportista del cliente.'
        ]
      },
      {
        name: 'Almacén de Exportación',
        description: 'Recepción, acondicionamiento y traslado hacia muelles.',
        steps: [
          'Ingreso con guía de exportación y sello definitivo.',
          'Asignación de patentes en zona Buffer.',
          'Salida sincronizada hacia STI o DP World antes del corte de stack.'
        ]
      }
    ]
  }
];
