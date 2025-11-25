import React from "react";

interface ElectrolyzerListProps {
  electrolyzerIds: number[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export default function ElectrolyzerList({
  electrolyzerIds,
  selectedId,
  onSelect,
}: ElectrolyzerListProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold text-gray-700 mb-3">Available Electrolyzer ID</h3>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {electrolyzerIds.length > 0 ? (
          electrolyzerIds.map((id) => (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={`w-full px-4 py-2 rounded text-center transition-colors font-medium ${
                selectedId === id
                  ? "bg-orange-400 text-white"
                  : "bg-gray-400 text-white hover:bg-gray-500"
              }`}
            >
              {id}
            </button>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No electrolyzer found</p>
        )}
      </div>
    </div>
  );
}
