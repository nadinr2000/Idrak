import floorPlanSvg from '@/assets/floor-plan-detailed.svg';

export function FloorPlanDisplay() {
  return (
    <div className="w-full h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Bunker Floor Plan</h1>
        <div className="w-full">
          <img src={floorPlanSvg} alt="Bunker Floor Plan" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}