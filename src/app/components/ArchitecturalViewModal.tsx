import { useState } from 'react';
import { X, ArrowLeft, Building2 } from 'lucide-react';
import { BuildingDiagram3D } from './BuildingDiagram3D';
import { FloorPlanView } from './FloorPlanView';
import { Language, translations } from '../translations';

interface ArchitecturalViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  emergencyMode?: boolean;
}

export function ArchitecturalViewModal({ isOpen, onClose, language, emergencyMode }: ArchitecturalViewModalProps) {
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
  const t = translations[language];

  if (!isOpen) return null;

  const handleFloorClick = (floorId: string) => {
    setSelectedFloor(floorId);
  };

  const handleBackToBuilding = () => {
    setSelectedFloor(null);
  };

  const handleClose = () => {
    setSelectedFloor(null);
    onClose();
  };

  return (
    <div className="fixed inset-x-0 bottom-0 top-[41px] z-50 bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Title */}
          <div className="flex items-center gap-3">
            <Building2 className="size-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              {language === 'en' ? 'Architectural View' : 'العرض المعماري'}
            </h1>
          </div>

          {/* Right side - Close button */}
          <button
            onClick={handleClose}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <X className="size-4" />
            {language === 'en' ? 'Close' : 'إغلاق'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100vh-114px)] overflow-auto">
        {selectedFloor ? (
          <FloorPlanView
            floorId={selectedFloor}
            onRoomClick={() => {}}
            onIncidentClick={() => {}}
            onBack={handleBackToBuilding}
            emergencyMode={emergencyMode}
          />
        ) : (
          <BuildingDiagram3D
            onFloorClick={handleFloorClick}
            language={language}
            emergencyMode={emergencyMode}
          />
        )}
      </div>
    </div>
  );
}