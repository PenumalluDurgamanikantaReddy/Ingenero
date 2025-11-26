import React from "react";
import { ElementPart, SelectedElement, ElementStatus } from "@/types";

interface ElementPartsTableProps {
  elements: ElementPart[];
  selectedElements: SelectedElement[];
  onSelectElement: (element: SelectedElement) => void;
  elementStatus: ElementStatus;
}

export default function ElementPartsTable({
  elements,
  selectedElements,
  onSelectElement,
  elementStatus,
}: ElementPartsTableProps) {
  const isElementSelected = (elementId: string) => {
    return selectedElements.some((e) => e.id === elementId);
  };

  const getStatusBadge = (elementId: string) => {
    const status = elementStatus[elementId];
    if (!status) return null;

    const badgeColor =
      status.status === "repair" ? "bg-red-500" : "bg-green-500";
    const badgeText =
      status.status === "repair"
        ? `Ready for Repair${
            status.checklistCount ? ` (${status.checklistCount})` : ""
          }`
        : `Ready for Assembly (${status.checklistCount})`;

    return (
      <span
        className={`${badgeColor} text-white text-xs font-bold px-2 py-1 rounded`}
      >
        {badgeText}
      </span>
    );
  };

  const isElementDisabled = (elementId: string) => {
    return !!elementStatus[elementId];
  };

  return (
  <div className="bg-white rounded-lg shadow overflow-hidden">
  <div className="">
    <table className="table-auto" style={{ width: "400px" }}>
      <thead className="bg-gray-200">
        <tr>
          <th className="px-3 py-2 w-20 text-left text-sm font-semibold text-gray-700">
            Position
          </th>
          <th className="px-3 py-2 w-40 text-left text-sm font-semibold text-gray-700">
            Element part ID
          </th>
          <th className="px-3 py-2 w-50 text-left text-sm font-semibold text-gray-700">
            Status
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {elements.map((element) => {
          const isDisabled = isElementDisabled(element.id);
          const isSelected = isElementSelected(element.id);

          return (
            <tr
              key={element.id}
              className={`${
                isDisabled
                  ? "bg-gray-100"
                  : isSelected
                  ? "bg-blue-50"
                  : "hover:bg-gray-50"
              } transition-colors`}
            >
              <td className="px-3 py-2 text-sm text-gray-700 w-20">
                {element.position}
              </td>

              <td className="px-3  py-2 w-40">
                <div className="flex items-center gap-3">

                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() =>
                      onSelectElement({
                        id: element.id,
                        position: element.position,
                      })
                    }
                    disabled={isDisabled}
                    style={isSelected ? { accentColor: "#fb923c" } : {}}
                    className="w-4 h-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  />

                  <div
                    className={`rounded-sm flex justify-center items-center 
                    text-white font-medium
                    ${isSelected ? "bg-orange-400" : "bg-gray-400"}`}
                    style={{
                      width: "110px",
                      height: "38px",
                      borderRadius: "4px",
                    }}
                  >
                    {element.id}
                  </div>
                </div>
              </td>

              <td className=" py-2  text-[5px] w-60 text-left">
                {getStatusBadge(element.id) || "-"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>

  );
}
