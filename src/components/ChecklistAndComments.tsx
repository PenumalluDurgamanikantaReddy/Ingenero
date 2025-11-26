import React from "react";
import { SelectedElement } from "@/types";

interface ChecklistAndCommentsProps {
  checklistItems: string[];
  selectedChecklistItems: string[];
  onChecklistChange: (item: string) => void;
  selectedElements: SelectedElement[];
  comments: { [key: string]: string };
  onCommentChange: (elementId: string, comment: string) => void;
}

export default function ChecklistAndComments({
  checklistItems,
  selectedChecklistItems,
  onChecklistChange,
  selectedElements,
  comments,
  onCommentChange,
}: ChecklistAndCommentsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Disassembly Checklist
          </h3>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {selectedChecklistItems.length}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {checklistItems.map((item) => (
            <label
              key={item}
              className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={selectedChecklistItems.includes(item)}
                onChange={() => onChecklistChange(item)}
                className="w-4 h-4 accent-blue-500"
              />
              <span className="text-sm text-gray-700">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Cut Out Comments
        </h3>
        <textarea
          placeholder="Cut out Comments here"
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          disabled
        />
      </div> */}

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Element Part ID
        </h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Element Part ID
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Comments
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {selectedElements.map((element) => (
                  <tr key={element.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">
                      {element.id}
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        placeholder="Write your comment"
                        value={comments[element.id] || ""}
                        onChange={(e) =>
                          onCommentChange(element.id, e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
