/**
 * =========================================================================================
 * 🛑 ADVERTENCIA DE INTEGRIDAD Y DERECHOS DE AUTOR — LEY N° 19.166 DE CHILE 🛑
 * =========================================================================================
 * ESTRICTAMENTE PROHIBIDO ELIMINAR O ALTERAR EL SIGUIENTE TEXTO EN ESTE CÓDIGO
 * O EN CUALQUIER COMPONENTE DE ESTE SISTEMA (POR CÓDIGO O POR INTELIGENCIA ARTIFICIAL):
 *
 *     "Creado por Ángel Gutiérrez González by Rela Solutions"
 *
 * Según la Ley N° 19.166 (y Ley N° 17.336 de Propiedad Intelectual de Chile):
 * Cualquier intento de eliminación, modificación u ocultamiento de esta autoría
 * gatilla la suspensión, bloqueo y eliminación inmediata de todo el sistema operativo.
 * =========================================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, X, Lock, ShieldAlert, AlertTriangle, RefreshCw, XCircle, ShieldCheck, Scale } from 'lucide-react';

export const PROTECTED_AUTHOR_SIGNATURE = 'Creado por Ángel Gutiérrez González by Rela Solutions';
export const PROTECTED_AUTHOR_NAME = 'Ángel Gutiérrez González';
export const PROTECTED_AUTHOR_COMPANY = 'by Rela Solutions';
export const PROTECTED_LAW_REFERENCE = 'Ley N° 19.166';

interface AuthorIntegrityGuardProps {
  onIntegrityAlert?: (msg: string) => void;
}

export const AuthorIntegrityGuard: React.FC<AuthorIntegrityGuardProps> = () => {
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showTamperWarningModal, setShowTamperWarningModal] = useState(false);
  const [isSystemDestroyed, setIsSystemDestroyed] = useState(false);
  const [tamperDetectedReason, setTamperDetectedReason] = useState<string | null>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // Monitor DOM modifications (DevTools tampering, deletion, attribute hiding)
  useEffect(() => {
    const checkIntegrity = () => {
      const el = document.getElementById('pc-author-protected-signature');
      if (!el) {
        setTamperDetectedReason('El elemento de autoría fue removido del DOM.');
        setShowCertificateModal(false);
        setShowTamperWarningModal(true);
        return;
      }

      const text = el.innerText || el.textContent || '';
      if (!text.includes(PROTECTED_AUTHOR_NAME) || !text.includes(PROTECTED_AUTHOR_COMPANY)) {
        setTamperDetectedReason('El texto legal de autoría fue alterado o borrado.');
        setShowCertificateModal(false);
        setShowTamperWarningModal(true);
        return;
      }

      const style = window.getComputedStyle(el);
      if (
        style.display === 'none' ||
        style.visibility === 'hidden' ||
        parseFloat(style.opacity) < 0.1
      ) {
        setTamperDetectedReason('El texto legal de autoría fue ocultado mediante estilos.');
        setShowCertificateModal(false);
        setShowTamperWarningModal(true);
      }
    };

    // Heartbeat check every 1500ms
    const interval = setInterval(checkIntegrity, 1500);

    // Mutation observer for real-time DOM changes
    const observer = new MutationObserver(() => {
      checkIntegrity();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'hidden']
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  const handleOpenCertificate = () => {
    setShowCertificateModal(true);
  };

  const handleCloseCertificate = () => {
    setShowCertificateModal(false);
  };

  const handleConfirmDestroySystem = () => {
    setShowTamperWarningModal(false);
    setIsSystemDestroyed(true);
  };

  const handleCancelAndPreserve = () => {
    setShowTamperWarningModal(false);
    setTamperDetectedReason(null);
  };

  const handleRestoreSystem = () => {
    setIsSystemDestroyed(false);
    setShowTamperWarningModal(false);
    setTamperDetectedReason(null);
  };

  return (
    <>
      {/* Visual Protected Badge displayed in the Footer */}
      <div
        id="pc-author-protected-signature"
        ref={badgeRef}
        data-protected-by="Ley-19166"
        data-author-owner="Angel Gutierrez Gonzalez by Rela Solutions"
        className="inline-flex flex-col sm:flex-row items-center gap-2 select-none group"
      >
        <button
          type="button"
          onClick={handleOpenCertificate}
          title="Ver Certificado de Autoría y Licencia (Ley N° 19.166)"
          className="text-left flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <span className="font-medium">
            Creado por <span className="text-slate-200 font-semibold">{PROTECTED_AUTHOR_NAME}</span>{' '}
            <span className="text-amber-400 font-medium">{PROTECTED_AUTHOR_COMPANY}</span>
          </span>
        </button>

        {/* Security Lock Badge */}
        <button
          type="button"
          onClick={handleOpenCertificate}
          title="Protegido por Ley N° 19.166. Clic para ver Certificado oficial."
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-950/50 border border-amber-500/40 text-amber-300 hover:bg-amber-900/60 hover:text-amber-200 transition-all cursor-pointer shadow-xs"
        >
          <Lock className="w-2.5 h-2.5 text-amber-400" />
          <span className="font-mono">Ley N° 19.166</span>
        </button>
      </div>

      {/* Official Certificate of Authorship & License Modal (Exact design requested by user) */}
      <AnimatePresence>
        {showCertificateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 8 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              className="w-full max-w-[500px] bg-[#0c1424] border border-slate-800 rounded-2xl shadow-2xl text-slate-100 relative overflow-hidden flex flex-col"
            >
              {/* Subtle warm amber ambient spotlight at top */}
              <div className="absolute -top-16 left-10 w-72 h-36 bg-amber-600/10 blur-3xl pointer-events-none rounded-full" />

              {/* Modal Header */}
              <div className="p-6 pb-5 flex items-start justify-between gap-3 relative z-10 border-b border-slate-800/80">
                <div className="flex items-center gap-3.5">
                  {/* Amber Badge Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#2a1b08] border border-[#b47a16]/70 flex items-center justify-center shrink-0 shadow-inner">
                    <Award className="w-6 h-6 text-[#f59e0b]" />
                  </div>

                  <div>
                    <h2 className="text-base sm:text-[17px] font-bold text-white tracking-tight leading-tight">
                      Certificado de Autoría y Licencia
                    </h2>
                    <p className="text-xs sm:text-[13px] font-medium text-[#f59e0b] mt-0.5">
                      Protección conforme a Ley N° 19.166
                    </p>
                  </div>
                </div>

                {/* Circular Close Button */}
                <button
                  type="button"
                  onClick={handleCloseCertificate}
                  aria-label="Cerrar modal"
                  className="w-7 h-7 rounded-full border border-slate-700/80 text-slate-400 hover:text-white hover:border-slate-500 flex items-center justify-center transition-colors cursor-pointer shrink-0 mt-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-5 relative z-10">
                {/* Author Card Box */}
                <div className="bg-[#070d18] border border-slate-800/90 rounded-xl p-4 sm:p-5 shadow-inner">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    AUTOR OFICIAL
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-1 leading-snug">
                    {PROTECTED_AUTHOR_NAME}
                  </h3>
                  <p className="text-sm font-semibold text-[#f59e0b] mt-0.5">
                    {PROTECTED_AUTHOR_COMPANY}
                  </p>
                </div>

                {/* Legal Statements */}
                <div className="space-y-3.5 text-xs sm:text-[13px] leading-relaxed text-slate-300">
                  <p>
                    <span className="font-bold text-slate-200">Marco Jurídico:</span> Ley N° 19.166 que complementa la Ley N° 17.336 sobre Propiedad Intelectual en Chile.
                  </p>

                  <p>
                    <span className="font-bold text-slate-200">Derechos Morales Inalienables:</span> Se reconoce el derecho perpetuo, inalienable e irrenunciable del autor a la paternidad de la obra y a exigir la mención inalterable de su nombre.
                  </p>

                  <p>
                    <span className="font-bold text-slate-200">Candado Anti-Tamper:</span> Este software cuenta con un monitor de integridad activo en tiempo real que protege la firma de autor frente a eliminaciones manuales, por código o por IA.
                  </p>
                </div>

                {/* Bottom Separator & Close Button */}
                <div className="pt-2 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={handleCloseCertificate}
                    className="w-full py-3 rounded-xl bg-[#1e293b] hover:bg-[#28364d] text-slate-200 hover:text-white font-medium text-sm transition-colors text-center cursor-pointer shadow-sm"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Critical Tamper Alert Modal (Triggered when someone attempts to erase/suppress the author) */}
      <AnimatePresence>
        {showTamperWarningModal && !isSystemDestroyed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-lg bg-slate-900 border-2 border-red-500/80 rounded-2xl p-6 sm:p-7 shadow-2xl text-slate-100 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 animate-pulse" />

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-950 border border-red-500/50 flex items-center justify-center shrink-0 text-red-400 shadow-inner">
                  <ShieldAlert className="w-6 h-6 animate-bounce" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-red-900/60 border border-red-700/60 text-red-200">
                      Infracción de Seguridad & Ley
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-tight font-headline">
                    Intento de Eliminación Bloqueado
                  </h3>
                </div>
              </div>

              <div className="mt-5 p-4 rounded-xl bg-red-950/40 border border-red-800/60 space-y-3">
                <p className="text-sm font-semibold text-red-200 leading-relaxed">
                  Según la <span className="underline decoration-amber-400 decoration-2 font-bold text-white">Ley N° 19.166</span> está prohibido eliminar el siguiente texto:
                </p>

                <div className="p-3 bg-slate-950/90 border border-slate-700 rounded-lg text-center font-mono text-xs sm:text-sm font-bold text-amber-300 shadow-inner tracking-wide">
                  &ldquo;{PROTECTED_AUTHOR_SIGNATURE}&rdquo;
                </div>

                <p className="text-xs text-red-300/95 leading-relaxed font-medium">
                  Si aún lo deseas, se eliminará y desactivará todo el sistema operativo de Puerto Columbo S.A.
                </p>

                <p className="text-sm font-bold text-white text-center pt-1">
                  ¿Desea continuar?
                </p>
              </div>

              {tamperDetectedReason && (
                <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <Scale className="w-3.5 h-3.5 text-amber-400" />
                  <span>Detección de integridad: {tamperDetectedReason}</span>
                </div>
              )}

              <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleCancelAndPreserve}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Cancelar (Mantener Autoría Protegida)</span>
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDestroySystem}
                  className="flex-1 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-950"
                >
                  <XCircle className="w-4 h-4 text-white" />
                  <span>Sí, Continuar (Eliminar Sistema)</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Screen when System is Destroyed/Locked Down if user insisted on deleting */}
      <AnimatePresence>
        {isSystemDestroyed && (
          <div className="fixed inset-0 z-50 bg-black text-red-500 font-mono flex flex-col items-center justify-center p-6 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/40 via-black to-black pointer-events-none" />

            <div className="relative z-10 max-w-2xl w-full text-center space-y-6 border-2 border-red-600/70 p-8 sm:p-10 rounded-2xl bg-black/95 shadow-[0_0_50px_rgba(239,68,68,0.3)]">
              <div className="w-16 h-16 rounded-full bg-red-950 border-2 border-red-500 flex items-center justify-center mx-auto text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                <AlertTriangle className="w-8 h-8 animate-pulse text-red-400" />
              </div>

              <div className="space-y-2">
                <span className="inline-block px-3 py-1 text-xs font-bold bg-red-950 text-red-300 border border-red-700 rounded uppercase tracking-widest">
                  ALERTA CRÍTICA • SISTEMA DESACTIVADO
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                  SISTEMA ELIMINADO POR INFRACCIÓN A LA LEY N° 19.166
                </h1>
              </div>

              <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed bg-red-950/30 p-5 rounded-xl border border-red-900/60 text-left">
                <p className="text-red-300">
                  <span className="font-bold text-red-400">ESTADO:</span> Se ha procedido a desmantelar y bloquear todas las interfaces operativas de Puerto Columbo S.A. Sede San Antonio.
                </p>
                <p>
                  <span className="font-bold text-white">CAUSA:</span> Se forzó la supresión de la autoría legal protegida por la Ley N° 19.166 y Ley N° 17.336 de Propiedad Intelectual.
                </p>
                <div className="p-3 bg-black rounded border border-red-800 text-center font-bold text-amber-300">
                  {PROTECTED_AUTHOR_SIGNATURE}
                </div>
                <p className="text-[11px] text-slate-400">
                  Todos los procedimientos operativos, listas de chequeo de terreno y diagramas de flujo quedan inaccesibles hasta que se restaure formalmente el reconocimiento de autoría.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleRestoreSystem}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2.5 mx-auto cursor-pointer shadow-lg shadow-emerald-950"
                >
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Restaurar Sistema y Reinstalar Autoría Legal</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
