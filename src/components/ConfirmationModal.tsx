import React from "react";
import { SelectedElement } from "@/types";

interface ConfirmationModalProps {
  action: "repair" | "assembly" | null;
  selectedItems: SelectedElement[];
  checklistCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  action,
  selectedItems,
  checklistCount,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  const getConfirmationMessage = () => {
    if (!action) return "";

    const itemIds = selectedItems.map((item) => item.id).join(", ");

    if (action === "repair") {
      return `Update Status of Element Part ID ${itemIds} to "Ready for Repair"`;
    } else {
      return `Update Status of Element Part ID ${itemIds} to "Ready for Assembly"`;
    }
  };

  return (
    <div className="fixed inset-0  bg-white bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Confirm Status</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">
          {getConfirmationMessage()}
        </p>

        {action === "repair" && checklistCount > 0 && (
          <div className="mb-6 p-3 bg-blue-50 rounded border border-blue-200">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Checklist Items:</span> {checklistCount}
            </p>
          </div>
        )}

        <div className="flex gap-4 justify-end">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-6 py-2 text-white rounded transition-colors font-medium ${
              action === "repair"
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
