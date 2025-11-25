"use client";

import React, { useState, useMemo } from "react";
import { electrolyzer_ids, element_ids, checklist_items } from "@/data";
import { SelectedElement, ElementStatus } from "@/types";
import SearchBar from "./SearchBar";
import ElectrolyzerList from "./ElectrolyzerList";
import ElementPartsTable from "./ElementPartsTable";
import ChecklistAndComments from "./ChecklistAndComments";
import ConfirmationModal from "./ConfirmationModal";

interface ConfirmModal {
  isOpen: boolean;
  action: "repair" | "assembly" | null;
  selectedItems: SelectedElement[];
  checklistCount: number;
}

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedElectrolyzerId, setSelectedElectrolyzerId] = useState<
    number | null
  >(null);
  const [selectedElements, setSelectedElements] = useState<SelectedElement[]>(
    []
  );
  const [checklistItems, setChecklistItems] = useState<string[]>([]);
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [elementStatus, setElementStatus] = useState<ElementStatus>({});
  const [confirmModal, setConfirmModal] = useState<ConfirmModal>({
    isOpen: false,
    action: null,
    selectedItems: [],
    checklistCount: 0,
  });

  const filteredElectrolyzerIds = useMemo(() => {
    return electrolyzer_ids.filter((id) => id.toString().includes(searchTerm));
  }, [searchTerm]);

  const handleSelectElectrolyzer = (id: number) => {
    setSelectedElectrolyzerId(id);
    setSelectedElements([]);
    setChecklistItems([]);
    setComments({});
  };

  const handleSelectElement = (element: SelectedElement) => {
    setSelectedElements((prev) => {
      const exists = prev.find((e) => e.id === element.id);
      if (exists) {
        return prev.filter((e) => e.id !== element.id);
      }
      return [...prev, element];
    });
  };

  const handleChecklistChange = (item: string) => {
    setChecklistItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      }
      return [...prev, item];
    });
  };

  const handleCommentChange = (elementId: string, comment: string) => {
    setComments((prev) => ({
      ...prev,
      [elementId]: comment,
    }));
  };

  const handleSendToRepair = () => {
    setConfirmModal({
      isOpen: true,
      action: "repair",
      selectedItems: selectedElements,
      checklistCount: checklistItems.length,
    });
  };

  const handleReadyToAssemble = () => {
    setConfirmModal({
      isOpen: true,
      action: "assembly",
      selectedItems: selectedElements,
      checklistCount: 0,
    });
  };

  const handleConfirmAction = () => {
    const newStatus: ElementStatus = { ...elementStatus };

    selectedElements.forEach((element) => {
      newStatus[element.id] = {
        status: confirmModal.action,
        checklistCount: checklistItems.length,
        comments: comments[element.id] || "",
      };
    });

    console.log(elementStatus)
    setElementStatus(newStatus);
    setConfirmModal({
      isOpen: false,
      action: null,
      selectedItems: [],
      checklistCount: 0,
    });
    setSelectedElements([]);
    setChecklistItems([]);
    setComments({});
  };
    console.log(elementStatus)

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gray-600 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold">
          Tephram Asset Management Solution
        </h1>
        <p className="text-gray-200 mt-1">Disassembly Electrolyzer</p>
      </div>

      <div className="flex flex-col  lg:flex-row gap-6 p-6 max-w-8xl mx-auto">
        <div className="w-full lg:w-1/6">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />

          <ElectrolyzerList
            electrolyzerIds={filteredElectrolyzerIds}
            selectedId={selectedElectrolyzerId}
            onSelect={handleSelectElectrolyzer}
          />
        </div>

        <div className="w-full flex  space-y-6">
          {selectedElectrolyzerId ? (
            <div className="flex w-full relative gap-2">
              <ElementPartsTable
                elements={element_ids}
                selectedElements={selectedElements}
                onSelectElement={handleSelectElement}
                elementStatus={elementStatus}
              />

              {selectedElements.length > 0 && (
                <>
                  <ChecklistAndComments
                    checklistItems={checklist_items}
                    selectedChecklistItems={checklistItems}
                    onChecklistChange={handleChecklistChange}
                    selectedElements={selectedElements}
                    comments={comments}
                    onCommentChange={handleCommentChange}
                  />

                </>
              )}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
              <p>Select an Electrolyzer ID to view element parts</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-4 justify-end">
        <button
          onClick={handleSendToRepair}
          className="px-8 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors font-medium"
        >
          Send to Repair
        </button>
        <button
          onClick={handleReadyToAssemble}
          className="px-8 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors font-medium"
        >
          Ready to Assemble
        </button>
      </div>
      {confirmModal.isOpen && (
        <ConfirmationModal
          action={confirmModal.action}
          selectedItems={confirmModal.selectedItems}
          checklistCount={confirmModal.checklistCount}
          onConfirm={handleConfirmAction}
          onCancel={() =>
            setConfirmModal({
              isOpen: false,
              action: null,
              selectedItems: [],
              checklistCount: 0,
            })
          }
        />
      )}
    </div>
  );
}
