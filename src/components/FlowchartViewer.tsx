import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Workflow,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Move,
  Info,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Search,
  ListOrdered
} from 'lucide-react';
import { FlowchartItem, FlowNode } from '../types';

interface FlowchartViewerProps {
  flowcharts: FlowchartItem[];
  onToast: (msg: string) => void;
}

export const FlowchartViewer: React.FC<FlowchartViewerProps> = ({
  flowcharts,
  onToast
}) => {
  const [selectedDiagramId, setSelectedDiagramId] = useState<string>(flowcharts[0]?.id || 'df-gc-001');
  const [viewMode, setViewMode] = useState<'canvas' | 'swimlanes'>('canvas');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [canvasPos, setCanvasPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Node position overrides when user drags nodes around
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});

  const containerRef = useRef<HTMLDivElement>(null);

  const currentDiagram = flowcharts.find((d) => d.id === selectedDiagramId) || flowcharts[0];

  // Unique categories for filter
  const categories = Array.from(new Set(flowcharts.map((d) => d.category))).sort();

  const filteredDiagrams = flowcharts.filter((d) => {
    const matchesCat = activeCategory === 'all' || d.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      d.title.toLowerCase().includes(q) ||
      d.code.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const handleSelectDiagram = (id: string) => {
    setSelectedDiagramId(id);
    setSelectedNode(null);
    setNodePositions({});
    setZoomLevel(1);
    setCanvasPos({ x: 0, y: 0 });
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(Math.max(0.5, prev + delta), 2));
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setCanvasPos({ x: 0, y: 0 });
    setNodePositions({});
    onToast('Vista y posiciones restablecidas al centro');
  };

  // Node position calculation (accounting for user dragging)
  const getNodePos = (node: FlowNode) => {
    if (nodePositions[node.id]) {
      return nodePositions[node.id];
    }
    return { x: node.x, y: node.y };
  };

  const getNodeColor = (type: FlowNode['type']) => {
    switch (type) {
      case 'start':
        return 'bg-emerald-500 text-white border-emerald-600 ring-4 ring-emerald-100';
      case 'end':
        return 'bg-rose-500 text-white border-rose-600 ring-4 ring-rose-100';
      case 'decision':
        return 'bg-amber-400 text-amber-950 border-amber-500 ring-4 ring-amber-100';
      case 'task':
      default:
        return 'bg-white text-slate-800 border-slate-300 hover:border-[#003B6F] shadow-xs';
    }
  };

  return (
    <div className="space-y-6">
      {/* Selector & Search Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#E6F0FA] text-[#003B6F] rounded-md border border-sky-200">
                Diagramas de Flujo Oficiales (BPMN)
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">
                {flowcharts.length} Flujogramas Operativos SAI
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Workflow className="w-6 h-6 text-[#003B6F]" />
              Visualizador de Procesos y Flujogramas
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Inspecciona los diagramas de flujo de cada faena portuaria con carriles interactivos y nodos móviles.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar flujograma..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 focus:bg-white text-xs text-slate-800 pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-[#003B6F] focus:ring-2 focus:ring-[#003B6F]/15 outline-none transition-all"
            />
          </div>
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-4 border-t border-slate-100 mt-4 text-xs">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#003B6F] text-white shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80'
            }`}
          >
            Todos ({flowcharts.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#003B6F] text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Diagram Selection Tabs Carousel */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-3">
          {filteredDiagrams.map((d) => {
            const isSelected = d.id === currentDiagram.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => handleSelectDiagram(d.id)}
                className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#003B6F] text-white border-[#003B6F] shadow-sm ring-2 ring-[#003B6F]/20'
                    : 'bg-slate-50 hover:bg-slate-100/90 text-slate-700 border-slate-200/80'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-xs ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-700'
                    }`}
                  >
                    {d.code}
                  </span>
                  <span
                    className={`text-[9px] ${
                      isSelected ? 'text-sky-200' : 'text-slate-400'
                    }`}
                  >
                    {d.nodes.length} nodos
                  </span>
                </div>
                <h4 className="text-xs font-bold truncate leading-tight">
                  {d.title.replace('Flujograma ', '')}
                </h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Diagram Workstation */}
      <div
        className={`bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col transition-all ${
          isFullscreen ? 'fixed inset-4 z-50 shadow-2xl h-[calc(100vh-2rem)]' : 'h-[750px]'
        }`}
      >
        {/* Workspace Toolbar */}
        <div className="px-4 py-3 bg-gradient-to-r from-slate-900 via-[#002B52] to-[#003B6F] text-white flex flex-wrap items-center justify-between gap-3 shrink-0 border-b border-sky-950/40">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-white/10 border border-white/15 text-sky-200 shrink-0">
              <Workflow className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-xs">
                  {currentDiagram.code}
                </span>
                <span className="text-[11px] text-sky-200 uppercase tracking-wider font-medium">
                  {currentDiagram.category}
                </span>
                <span className="text-xs text-sky-300/60 hidden sm:inline">•</span>
                <span className="text-[11px] text-sky-200/80 hidden sm:inline">
                  {currentDiagram.lanes.length} Carriles Operativos
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white truncate mt-0.5">
                {currentDiagram.title}
              </h3>
            </div>
          </div>

          {/* Controls: Mode Switch, Zoom, Fullscreen, Reset */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="p-0.5 bg-black/25 rounded-lg flex items-center border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('canvas')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  viewMode === 'canvas'
                    ? 'bg-[#003B6F] text-white shadow-xs'
                    : 'text-sky-200 hover:text-white'
                }`}
              >
                Gráfico Móvil
              </button>
              <button
                type="button"
                onClick={() => setViewMode('swimlanes')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  viewMode === 'swimlanes'
                    ? 'bg-[#003B6F] text-white shadow-xs'
                    : 'text-sky-200 hover:text-white'
                }`}
              >
                Carriles
              </button>
            </div>

            {viewMode === 'canvas' && (
              <>
                <div className="h-5 w-px bg-white/15 mx-1" />

                <div className="flex items-center gap-1 bg-black/25 p-1 rounded-lg border border-white/10">
                  <button
                    type="button"
                    onClick={() => handleZoom(-0.15)}
                    className="p-1 rounded-md hover:bg-white/15 text-white transition-colors cursor-pointer"
                    title="Alejar (Zoom Out)"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono font-bold text-sky-200 px-1 min-w-10 text-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => handleZoom(0.15)}
                    className="p-1 rounded-md hover:bg-white/15 text-white transition-colors cursor-pointer"
                    title="Acercar (Zoom In)"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleResetView}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors cursor-pointer"
                  title="Restablecer posición y zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors cursor-pointer"
              title={isFullscreen ? 'Salir de pantalla completa' : 'Ver en pantalla completa'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Interactive Canvas or Swimlanes View */}
        <div className="relative flex-1 bg-slate-900 overflow-hidden select-none">
          {viewMode === 'canvas' ? (
            <div
              ref={containerRef}
              className="w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden"
              style={{
                backgroundImage:
                  'radial-gradient(#334155 1px, transparent 1px), linear-gradient(#0b1329, #080e1e)',
                backgroundSize: '32px 32px, 100% 100%'
              }}
            >
              {/* Floating Help Badge */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-700/80 text-[11px] text-sky-200 shadow-lg">
                  <Move className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    <strong>Interactivo:</strong> Arrastra el lienzo para navegar y <strong>mueve cualquier nodo</strong> con el cursor
                  </span>
                </div>
              </div>

              {/* Movable Canvas Area with Framer Motion */}
              <motion.div
                drag
                dragMomentum={false}
                onDrag={(_, info) => {
                  setCanvasPos((prev) => ({
                    x: prev.x + info.delta.x,
                    y: prev.y + info.delta.y
                  }));
                }}
                animate={{
                  scale: zoomLevel,
                  x: canvasPos.x,
                  y: canvasPos.y
                }}
                transition={{ type: 'spring', damping: 40, stiffness: 400 }}
                className="absolute inset-0 origin-center min-w-[2000px] min-h-[900px] p-12"
              >
                {/* Visual Swimlanes Background */}
                <div className="relative border border-slate-700/80 rounded-2xl bg-slate-900/60 backdrop-blur-sm overflow-hidden mb-8 shadow-2xl">
                  {currentDiagram.lanes.map((lane, idx) => (
                    <div
                      key={lane.id}
                      className="flex border-b last:border-b-0 border-slate-800 min-h-[140px] relative"
                    >
                      {/* Lane Header Bar */}
                      <div
                        className="w-48 sm:w-56 p-4 border-r border-slate-800 flex items-center justify-between shrink-0"
                        style={{
                          backgroundColor: `${lane.color}15`,
                          borderLeft: `4px solid ${lane.color}`
                        }}
                      >
                        <div>
                          <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block mb-0.5">
                            Carril {idx + 1}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                            {lane.name}
                          </h4>
                        </div>
                      </div>

                      {/* Lane Area placeholder line */}
                      <div className="flex-1 relative min-w-[1500px]" />
                    </div>
                  ))}

                  {/* SVG Connector Arrows Layer */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <defs>
                      <marker
                        id="arrowhead-flow"
                        markerWidth="8"
                        markerHeight="8"
                        refX="7"
                        refY="4"
                        orient="auto"
                      >
                        <polygon points="0 1, 8 4, 0 7" fill="#38bdf8" />
                      </marker>
                      <marker
                        id="arrowhead-amber"
                        markerWidth="8"
                        markerHeight="8"
                        refX="7"
                        refY="4"
                        orient="auto"
                      >
                        <polygon points="0 1, 8 4, 0 7" fill="#fbbf24" />
                      </marker>
                    </defs>

                    {currentDiagram.connections.map((conn, cIdx) => {
                      const fromNode = currentDiagram.nodes.find((n) => n.id === conn.from);
                      const toNode = currentDiagram.nodes.find((n) => n.id === conn.to);
                      if (!fromNode || !toNode) return null;

                      const fromP = getNodePos(fromNode);
                      const toP = getNodePos(toNode);

                      // Offset coordinates to center of nodes
                      const x1 = fromP.x + (fromNode.type === 'start' || fromNode.type === 'end' ? 24 : 85);
                      const y1 = fromP.y + (fromNode.type === 'start' || fromNode.type === 'end' ? 24 : 45);
                      const x2 = toP.x + (toNode.type === 'start' || toNode.type === 'end' ? 24 : 10);
                      const y2 = toP.y + (toNode.type === 'start' || toNode.type === 'end' ? 24 : 45);

                      // Curved smooth connection line
                      const midX = (x1 + x2) / 2;
                      const pathData = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;

                      return (
                        <g key={cIdx}>
                          <path
                            d={pathData}
                            fill="none"
                            stroke={conn.condition === 'yes' ? '#34d399' : conn.condition === 'no' ? '#f87171' : '#38bdf8'}
                            strokeWidth="2.5"
                            strokeDasharray={conn.condition ? '5,5' : 'none'}
                            markerEnd={conn.condition ? 'url(#arrowhead-amber)' : 'url(#arrowhead-flow)'}
                            className="transition-all duration-300 opacity-80"
                          />
                          {conn.label && (
                            <text
                              x={midX}
                              y={(y1 + y2) / 2 - 8}
                              fill="#fbbf24"
                              fontSize="10"
                              fontWeight="bold"
                              textAnchor="middle"
                              className="bg-slate-900 font-mono"
                            >
                              {conn.label}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Flow Nodes (Draggable by User!) */}
                  {currentDiagram.nodes.map((node) => {
                    const pos = getNodePos(node);
                    const isSelected = selectedNode?.id === node.id;

                    if (node.type === 'start') {
                      return (
                        <motion.div
                          key={node.id}
                          drag
                          dragMomentum={false}
                          onDragEnd={(_, info) => {
                            setNodePositions((prev) => ({
                              ...prev,
                              [node.id]: {
                                x: pos.x + info.offset.x,
                                y: pos.y + info.offset.y
                              }
                            }));
                          }}
                          onClick={() => setSelectedNode(node)}
                          style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
                          className={`absolute z-10 w-12 h-12 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing font-bold text-xs shadow-lg transition-transform ${getNodeColor(
                            'start'
                          )} ${isSelected ? 'scale-125 ring-8 ring-emerald-300/50' : 'hover:scale-110'}`}
                          title="Hito de Inicio"
                        >
                          ▶
                        </motion.div>
                      );
                    }

                    if (node.type === 'end') {
                      return (
                        <motion.div
                          key={node.id}
                          drag
                          dragMomentum={false}
                          onDragEnd={(_, info) => {
                            setNodePositions((prev) => ({
                              ...prev,
                              [node.id]: {
                                x: pos.x + info.offset.x,
                                y: pos.y + info.offset.y
                              }
                            }));
                          }}
                          onClick={() => setSelectedNode(node)}
                          style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
                          className={`absolute z-10 w-12 h-12 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing font-bold text-xs shadow-lg transition-transform ${getNodeColor(
                            'end'
                          )} ${isSelected ? 'scale-125 ring-8 ring-rose-300/50' : 'hover:scale-110'}`}
                          title="Hito de Cierre"
                        >
                          ■
                        </motion.div>
                      );
                    }

                    if (node.type === 'decision') {
                      return (
                        <motion.div
                          key={node.id}
                          drag
                          dragMomentum={false}
                          onDragEnd={(_, info) => {
                            setNodePositions((prev) => ({
                              ...prev,
                              [node.id]: {
                                x: pos.x + info.offset.x,
                                y: pos.y + info.offset.y
                              }
                            }));
                          }}
                          onClick={() => setSelectedNode(node)}
                          style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
                          className={`absolute z-10 w-36 h-24 p-3 rounded-2xl flex flex-col items-center justify-center text-center cursor-grab active:cursor-grabbing shadow-xl transition-all border-2 border-amber-400 bg-amber-500/20 backdrop-blur-md ${
                            isSelected ? 'ring-4 ring-amber-300 scale-105' : 'hover:scale-105'
                          }`}
                        >
                          <span className="text-[9px] uppercase font-bold text-amber-300 tracking-wider">
                            Decisión
                          </span>
                          <span className="text-xs font-bold text-white leading-tight mt-0.5">
                            {node.label}
                          </span>
                        </motion.div>
                      );
                    }

                    // Standard Task Node
                    return (
                      <motion.div
                        key={node.id}
                        drag
                        dragMomentum={false}
                        onDragEnd={(_, info) => {
                          setNodePositions((prev) => ({
                            ...prev,
                            [node.id]: {
                              x: pos.x + info.offset.x,
                              y: pos.y + info.offset.y
                            }
                          }));
                        }}
                        onClick={() => setSelectedNode(node)}
                        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
                        className={`absolute z-10 w-44 min-h-[75px] p-3 rounded-xl bg-slate-800/90 border cursor-grab active:cursor-grabbing text-left shadow-xl transition-all ${
                          isSelected
                            ? 'border-sky-400 ring-4 ring-sky-400/30 bg-slate-800 scale-105'
                            : 'border-slate-600/90 hover:border-sky-400 hover:scale-105'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[9px] uppercase font-bold tracking-wider text-sky-400 font-mono">
                            Tarea Operativa
                          </span>
                          <Move className="w-2.5 h-2.5 text-slate-500" />
                        </div>
                        <h5 className="text-xs font-bold text-white leading-snug">
                          {node.label}
                        </h5>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Node Details Flyout Drawer */}
              <AnimatePresence>
                {selectedNode && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute top-4 right-4 z-30 w-80 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700/80 p-4 shadow-2xl text-white"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3 pb-2 border-b border-slate-800">
                      <div>
                        <span className="text-[10px] font-mono uppercase font-bold text-sky-400">
                          Detalle del Paso Operativo
                        </span>
                        <h4 className="text-sm font-bold text-white mt-0.5">
                          {selectedNode.label}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedNode(null)}
                        className="text-slate-400 hover:text-white p-1 rounded-md cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">
                          Responsable / Carril:
                        </span>
                        <span className="text-amber-300 font-semibold">
                          {currentDiagram.lanes.find((l) => l.id === selectedNode.laneId)?.name || 'N/A'}
                        </span>
                      </div>

                      {selectedNode.description && (
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">
                            Descripción Operativa:
                          </span>
                          <p className="text-slate-200 leading-relaxed text-[11px] mt-0.5">
                            {selectedNode.description}
                          </p>
                        </div>
                      )}

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Tipo: <strong className="text-white capitalize">{selectedNode.type}</strong></span>
                        <span className="text-emerald-400">Paso Homologado SAI</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Swimlanes Detailed Structured Matrix */
            <div className="w-full h-full p-6 overflow-y-auto bg-slate-900 text-white">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-start gap-3">
                  <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Matriz de Responsabilidades y Subprocesos:</strong>
                    <p className="mt-1 leading-relaxed text-slate-400">
                      Desglose paso a paso de cada participante involucrado en el flujograma ({currentDiagram.code}), garantizando la coordinación entre cuadrillas de terreno, transportistas y sistemas informáticos.
                    </p>
                  </div>
                </div>

                {/* Subprocesses Cards */}
                {currentDiagram.subprocesses && currentDiagram.subprocesses.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                      <ListOrdered className="w-4 h-4" />
                      Subprocesos Oficiales del Flujograma:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentDiagram.subprocesses.map((sub, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-slate-800/90 rounded-xl border border-slate-700/80 p-4"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-300 font-bold text-xs flex items-center justify-center">
                              {sIdx + 1}
                            </span>
                            <h5 className="text-xs sm:text-sm font-bold text-white">
                              {sub.name}
                            </h5>
                          </div>
                          <p className="text-xs text-slate-400 mb-3">
                            {sub.description}
                          </p>
                          <ul className="space-y-1.5 text-xs text-slate-300">
                            {sub.steps.map((st, stIdx) => (
                              <li key={stIdx} className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-0.5">•</span>
                                <span className="leading-snug">{st}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lanes Breakdown */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-sky-300 flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Carriles Operativos y Tareas Asignadas:
                  </h4>
                  <div className="space-y-3">
                    {currentDiagram.lanes.map((lane, lIdx) => {
                      const laneNodes = currentDiagram.nodes.filter((n) => n.laneId === lane.id);
                      return (
                        <div
                          key={lane.id}
                          className="bg-slate-800/60 rounded-xl border border-slate-700/80 p-4"
                        >
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2.5">
                              <span
                                className="w-3.5 h-3.5 rounded-full"
                                style={{ backgroundColor: lane.color }}
                              />
                              <h5 className="text-sm font-bold text-white">
                                {lane.name}
                              </h5>
                            </div>
                            <span className="text-xs font-mono text-slate-400">
                              {laneNodes.length} acciones
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {laneNodes.map((n) => (
                              <div
                                key={n.id}
                                className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-2"
                              >
                                <span className="text-sky-400 font-bold mt-0.5">→</span>
                                <div>
                                  <div className="font-semibold text-slate-200">
                                    {n.label}
                                  </div>
                                  {n.description && (
                                    <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                                      {n.description}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="px-4 py-2.5 bg-slate-900 text-slate-400 border-t border-slate-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 truncate">
            <span className="font-bold text-slate-200">{currentDiagram.title}</span>
            <span>•</span>
            <span className="text-emerald-400">Validado en Sede San Antonio</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Nodos interactivos: <strong>{currentDiagram.nodes.length}</strong></span>
            <span>•</span>
            <span>Conexiones lógicas: <strong>{currentDiagram.connections.length}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
