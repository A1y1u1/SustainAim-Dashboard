"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaBolt, FaDownload, FaEllipsisV, FaPlus, FaTimes } from "react-icons/fa";
import * as XLSX from "xlsx";

// Define theme colors to avoid hardcoding
const theme = {
  primaryColor: "#2c7873",
  primaryColorLight: "rgba(44, 120, 115, 0.1)",
  primaryColorDark: "rgba(44, 120, 115, 0.2)",
};

interface EmissionData {
  id: number;
  year: number;
  month: string;
  category: string;
  inputDate: string;
  invoiceBill: string;
  activityUnit: number;
  activityUnitType: string; // New field for unit type
  emissionFactor: number;
  efSource: string;
  emissionTCO2e: number; // in tCO2e
  calculation: string;
}

const mockEmissionData: EmissionData[] = [
  {
    id: 1,
    year: 2024,
    month: "January",
    category: "Electricity",
    inputDate: "2024-01-15",
    invoiceBill: "INV-2024-001",
    activityUnit: 1356.0,
    activityUnitType: "KWH",
    emissionFactor: 0.709,
    efSource: "EPA eGRID",
    emissionTCO2e: 0.961,
    calculation: "1356 × 0.709 ÷ 1000",
  },
  {
    id: 2,
    year: 2024,
    month: "February",
    category: "Electricity",
    inputDate: "2024-02-15",
    invoiceBill: "INV-2024-002",
    activityUnit: 1200.0,
    activityUnitType: "KWH",
    emissionFactor: 0.709,
    efSource: "EPA eGRID",
    emissionTCO2e: 0.851,
    calculation: "1200 × 0.709 ÷ 1000",
  },
  {
    id: 3,
    year: 2024,
    month: "March",
    category: "Electricity",
    inputDate: "2024-03-15",
    invoiceBill: "INV-2024-003",
    activityUnit: 1450.0,
    activityUnitType: "KWH",
    emissionFactor: 0.709,
    efSource: "EPA eGRID",
    emissionTCO2e: 1.028,
    calculation: "1450 × 0.709 ÷ 1000",
  },
  {
    id: 4,
    year: 2024,
    month: "April",
    category: "Electricity",
    inputDate: "2024-04-15",
    invoiceBill: "INV-2024-004",
    activityUnit: 1300.0,
    activityUnitType: "KWH",
    emissionFactor: 0.709,
    efSource: "EPA eGRID",
    emissionTCO2e: 0.920,
    calculation: "1300 × 0.709 ÷ 1000",
  },
  {
    id: 5,
    year: 2024,
    month: "May",
    category: "Electricity",
    inputDate: "2024-05-15",
    invoiceBill: "INV-2024-005",
    activityUnit: 1400.0,
    activityUnitType: "KWH",
    emissionFactor: 0.709,
    efSource: "EPA eGRID",
    emissionTCO2e: 0.993,
    calculation: "1400 × 0.709 ÷ 1000",
  },
  {
    id: 6,
    year: 2024,
    month: "June",
    category: "Electricity",
    inputDate: "2024-06-15",
    invoiceBill: "INV-2024-006",
    activityUnit: 1250.0,
    activityUnitType: "KWH",
    emissionFactor: 0.709,
    efSource: "EPA eGRID",
    emissionTCO2e: 0.885,
    calculation: "1250 × 0.709 ÷ 1000",
  },
  {
    id: 7,
    year: 2024,
    month: "July",
    category: "Electricity",
    inputDate: "2024-07-15",
    invoiceBill: "INV-2024-007",
    activityUnit: 1500.0,
    activityUnitType: "KWH",
    emissionFactor: 0.709,
    efSource: "EPA eGRID",
    emissionTCO2e: 1.064,
    calculation: "1500 × 0.709 ÷ 1000",
  },
  {
    id: 8,
    year: 2024,
    month: "August",
    category: "Electricity",
    inputDate: "2024-08-15",
    invoiceBill: "INV-2024-008",
    activityUnit: 1550.0,
    activityUnitType: "KWH",
    emissionFactor: 0.709,
    efSource: "EPA eGRID",
    emissionTCO2e: 1.098,
    calculation: "1550 × 0.709 ÷ 1000",
  },
  {
    id: 9,
    year: 2024,
    month: "September",
    category: "Electricity",
    inputDate: "2024-09-15",
    invoiceBill: "INV-2024-009",
    activityUnit: 1600.0,
    activityUnitType: "KWH",
    emissionFactor: 0.709,
    efSource: "EPA eGRID",
    emissionTCO2e: 1.135,
    calculation: "1600 × 0.709 ÷ 1000",
  },
  {
    id: 10,
    year: 2024,
    month: "October",
    category: "Electricity",
    inputDate: "2024-10-15",
    invoiceBill: "INV-2024-010",
    activityUnit: 1700.0,
    activityUnitType: "KWH",
    emissionFactor: 0.709,
    efSource: "EPA eGRID",
    emissionTCO2e: 1.205,
    calculation: "1700 × 0.709 ÷ 1000",
  },
  {
    id: 11,
    year: 2024,
    month: "November",
    category: "Electricity",
    inputDate: "2024-11-15",
    invoiceBill: "INV-2024-011",
    activityUnit: 1800.0,
    activityUnitType: "KWH",
    emissionFactor: 0.709,
    efSource: "EPA eGRID",
    emissionTCO2e: 1.275,
    calculation: "1800 × 0.709 ÷ 1000",
  },
  {
    id: 12,
    year: 2024,
    month: "December",
    category: "Electricity",
    inputDate: "2024-12-15",
    invoiceBill: "INV-2024-012",
    activityUnit: 1900.0,
    activityUnitType: "KWH",
    emissionFactor: 0.709,
    efSource: "EPA eGRID",
    emissionTCO2e: 1.345,
    calculation: "1900 × 0.709 ÷ 1000",
  },
  {
    id: 13,
    year: 2025,
    month: "January",
    category: "Electricity",
    inputDate: "2025-01-15",
    invoiceBill: "INV-2024-013",
    activityUnit: 2000.0,
    activityUnitType: "KWH",
    emissionFactor: 0.709,
    efSource: "EPA eGRID",
    emissionTCO2e: 1.415,
    calculation: "2000 × 0.709 ÷ 1000",
  },
  {
    id: 14,
    year: 2024,
    month: "January",
    category: "Fossil Fuel",
    inputDate: "2024-01-15",
    invoiceBill: "INV-2024-014",
    activityUnit: 500.0,
    activityUnitType: "Liter",
    emissionFactor: 2.5,
    efSource: "IPCC Guidelines",
    emissionTCO2e: 1.25,
    calculation: "500 × 2.5 ÷ 1000",
  },
  {
    id: 15,
    year: 2024,
    month: "February",
    category: "Fossil Fuel",
    inputDate: "2024-02-15",
    invoiceBill: "INV-2024-015",
    activityUnit: 600.0,
    activityUnitType: "Liter",
    emissionFactor: 2.5,
    efSource: "IPCC Guidelines",
    emissionTCO2e: 1.5,
    calculation: "600 × 2.5 ÷ 1000",
  },
  {
    id: 16,
    year: 2024,
    month: "January",
    category: "Travel",
    inputDate: "2024-01-15",
    invoiceBill: "INV-2024-016",
    activityUnit: 1000.0,
    activityUnitType: "Kg",
    emissionFactor: 0.12,
    efSource: "DEFRA",
    emissionTCO2e: 0.12,
    calculation: "1000 × 0.12 ÷ 1000",
  },
  {
    id: 17,
    year: 2024,
    month: "February",
    category: "Travel",
    inputDate: "2024-02-15",
    invoiceBill: "INV-2024-017",
    activityUnit: 1200.0,
    activityUnitType: "Kg",
    emissionFactor: 0.12,
    efSource: "DEFRA",
    emissionTCO2e: 0.144,
    calculation: "1200 × 0.12 ÷ 1000",
  },
  {
    id: 18,
    year: 2024,
    month: "January",
    category: "Transportation",
    inputDate: "2024-01-15",
    invoiceBill: "INV-2024-018",
    activityUnit: 800.0,
    activityUnitType: "Kg",
    emissionFactor: 0.15,
    efSource: "EPA",
    emissionTCO2e: 0.12,
    calculation: "800 × 0.15 ÷ 1000",
  },
  {
    id: 19,
    year: 2024,
    month: "February",
    category: "Transportation",
    inputDate: "2024-02-15",
    invoiceBill: "INV-2024-019",
    activityUnit: 900.0,
    activityUnitType: "Kg",
    emissionFactor: 0.15,
    efSource: "EPA",
    emissionTCO2e: 0.135,
    calculation: "900 × 0.15 ÷ 1000",
  },
  {
    id: 20,
    year: 2024,
    month: "January",
    category: "Waste",
    inputDate: "2024-01-15",
    invoiceBill: "INV-2024-020",
    activityUnit: 400.0,
    activityUnitType: "Kg",
    emissionFactor: 1.2,
    efSource: "EPA WARM",
    emissionTCO2e: 0.48,
    calculation: "400 × 1.2 ÷ 1000",
  },
  {
    id: 21,
    year: 2024,
    month: "February",
    category: "Waste",
    inputDate: "2024-02-15",
    invoiceBill: "INV-2024-021",
    activityUnit: 450.0,
    activityUnitType: "Kg",
    emissionFactor: 1.2,
    efSource: "EPA WARM",
    emissionTCO2e: 0.54,
    calculation: "450 × 1.2 ÷ 1000",
  },
  {
    id: 22,
    year: 2024,
    month: "January",
    category: "Fugitives",
    inputDate: "2024-01-15",
    invoiceBill: "INV-2024-022",
    activityUnit: 200.0,
    activityUnitType: "Kg",
    emissionFactor: 5.0,
    efSource: "IPCC",
    emissionTCO2e: 1.0,
    calculation: "200 × 5.0 ÷ 1000",
  },
  {
    id: 23,
    year: 2024,
    month: "February",
    category: "Fugitives",
    inputDate: "2024-02-15",
    invoiceBill: "INV-2024-023",
    activityUnit: 250.0,
    activityUnitType: "Kg",
    emissionFactor: 5.0,
    efSource: "IPCC",
    emissionTCO2e: 1.25,
    calculation: "250 × 5.0 ÷ 1000",
  },
  {
    id: 24,
    year: 2024,
    month: "January",
    category: "Goods & Services",
    inputDate: "2024-01-15",
    invoiceBill: "INV-2024-024",
    activityUnit: 3000.0,
    activityUnitType: "Kg",
    emissionFactor: 0.05,
    efSource: "DEFRA",
    emissionTCO2e: 0.15,
    calculation: "3000 × 0.05 ÷ 1000",
  },
  {
    id: 25,
    year: 2024,
    month: "February",
    category: "Goods & Services",
    inputDate: "2024-02-15",
    invoiceBill: "INV-2024-025",
    activityUnit: 3500.0,
    activityUnitType: "Kg",
    emissionFactor: 0.05,
    efSource: "DEFRA",
    emissionTCO2e: 0.175,
    calculation: "3500 × 0.05 ÷ 1000",
  },
];

interface ElectricityProps {
  category?: string; // Optional category prop, defaults to "all"
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex rounded-xl items-center justify-center z-50 modal-overlay">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-md relative shadow-2xl transform transition-all duration-300 scale-95"
        style={{ borderColor: theme.primaryColor, borderWidth: "2px" } as React.CSSProperties}
      >
        <button
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-[#2c7873] transition-colors duration-150"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </button>
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: theme.primaryColor } as React.CSSProperties}
        >
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

interface DropdownMenuProps {
  recordId: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onViewDetails: (id: number) => void;
  onClose: () => void;
  isOpen: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ recordId, onEdit, onDelete, onViewDetails, onClose, isOpen }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-900 border z-10 transition-all duration-200 ease-in-out transform scale-95 hover:scale-100"
      style={{ borderColor: theme.primaryColor } as React.CSSProperties}
    >
      <div className="py-1">
        <button
          onClick={() => {
            onEdit(recordId);
            onClose();
          }}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-[rgba(44,120,115,0.1)] hover:text-[#2c7873] dark:hover:bg-[rgba(44,120,115,0.2)] dark:hover:text-[#2c7873] transition-colors duration-150"
        >
          Edit
        </button>
        <button
          onClick={() => {
            onDelete(recordId);
            onClose();
          }}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-[rgba(44,120,115,0.1)] hover:text-[#2c7873] dark:hover:bg-[rgba(44,120,115,0.2)] dark:hover:text-[#2c7873] transition-colors duration-150"
        >
          Delete
        </button>
        <button
          onClick={() => {
            onViewDetails(recordId);
            onClose();
          }}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-[rgba(44,120,115,0.1)] hover:text-[#2c7873] dark:hover:bg-[rgba(44,120,115,0.2)] dark:hover:text-[#2c7873] transition-colors duration-150"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

const Electricity: React.FC<ElectricityProps> = ({ category = "all" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<EmissionData | null>(null);
  const [data, setData] = useState<EmissionData[]>([...mockEmissionData].reverse());
  const [formData, setFormData] = useState({
    category: category === "all" ? "Electricity" : category,
    year: new Date().getFullYear(),
    month: new Date().toLocaleString("default", { month: "long" }),
    inputDate: new Date().toISOString().split("T")[0],
    invoiceBill: "",
    activityUnit: 0,
    activityUnitType: "KWH",
    emissionFactor: 0.709,
    efSource: "EPA eGRID",
  });
  const itemsPerPage = 12;

  // Filter data based on category prop
  const filteredData = category === "all" ? data : data.filter((record) => record.category === category);
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const categories = [
    "Fossil Fuel",
    "Fugitives",
    "Process Emission",
  ];

  const unitTypes = ["KWH", "Kg", "Liter"];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOpenMenuId(null);
  };

  const toggleMenu = (recordId: number) => {
    setOpenMenuId(openMenuId === recordId ? null : recordId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const totalEmissions = filteredData.reduce((sum, item) => sum + item.emissionTCO2e, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" || name === "activityUnit" || name === "emissionFactor" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAddData = () => {
    const emissionTCO2e = (formData.activityUnit * formData.emissionFactor) / 1000;
    const newRecord: EmissionData = {
      id: data.length + 1,
      category: formData.category,
      year: formData.year,
      month: formData.month,
      inputDate: formData.inputDate,
      invoiceBill: formData.invoiceBill,
      activityUnit: formData.activityUnit,
      activityUnitType: formData.activityUnitType,
      emissionFactor: formData.emissionFactor,
      efSource: formData.efSource,
      emissionTCO2e,
      calculation: `${formData.activityUnit} × ${formData.emissionFactor} ÷ 1000`,
    };
    setData([newRecord, ...data]);
    setIsAddModalOpen(false);
    setFormData({
      category: category === "all" ? "Electricity" : category,
      year: new Date().getFullYear(),
      month: new Date().toLocaleString("default", { month: "long" }),
      inputDate: new Date().toISOString().split("T")[0],
      invoiceBill: "",
      activityUnit: 0,
      activityUnitType: "KWH",
      emissionFactor: 0.709,
      efSource: "EPA eGRID",
    });
    setCurrentPage(1);
  };

  const handleEditData = () => {
    if (selectedRecord) {
      const emissionTCO2e = (formData.activityUnit * formData.emissionFactor) / 1000;
      const updatedRecord: EmissionData = {
        ...selectedRecord,
        category: formData.category,
        year: formData.year,
        month: formData.month,
        inputDate: formData.inputDate,
        invoiceBill: formData.invoiceBill,
        activityUnit: formData.activityUnit,
        activityUnitType: formData.activityUnitType,
        emissionFactor: formData.emissionFactor,
        efSource: formData.efSource,
        emissionTCO2e,
        calculation: `${formData.activityUnit} × ${formData.emissionFactor} ÷ 1000`,
      };
      setData(data.map((record) => (record.id === selectedRecord.id ? updatedRecord : record)));
      setIsEditModalOpen(false);
      setSelectedRecord(null);
      setFormData({
        category: category === "all" ? "Electricity" : category,
        year: new Date().getFullYear(),
        month: new Date().toLocaleString("default", { month: "long" }),
        inputDate: new Date().toISOString().split("T")[0],
        invoiceBill: "",
        activityUnit: 0,
        activityUnitType: "KWH",
        emissionFactor: 0.709,
        efSource: "EPA eGRID",
      });
    }
  };

  const handleDeleteData = (id: number) => {
    setData(data.filter((record) => record.id !== id));
    setIsDeleteModalOpen(false);
    setSelectedRecord(null);
  };

  const handleEditClick = (id: number) => {
    const record = data.find((r) => r.id === id);
    if (record) {
      setSelectedRecord(record);
      setFormData({
        category: record.category,
        year: record.year,
        month: record.month,
        inputDate: record.inputDate,
        invoiceBill: record.invoiceBill,
        activityUnit: record.activityUnit,
        activityUnitType: record.activityUnitType,
        emissionFactor: record.emissionFactor,
        efSource: record.efSource,
      });
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteClick = (id: number) => {
    const record = data.find((r) => r.id === id);
    if (record) {
      setSelectedRecord(record);
      setIsDeleteModalOpen(true);
    }
  };

  const handleViewDetailsClick = (id: number) => {
    const record = data.find((r) => r.id === id);
    if (record) {
      setSelectedRecord(record);
      setIsViewModalOpen(true);
    }
  };

  const handleExportData = () => {
    // Group data by year
    const groupedByYear = filteredData.reduce((acc, record) => {
      const year = record.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push({
        "Sr. No.": acc[year].length + 1,
        Year: record.year,
        Month: record.month,
        Category: record.category,
        "Input Date": formatDate(record.inputDate),
        "Invoice/Bill": record.invoiceBill,
        "Activity Unit": record.activityUnit,
        "Activity Unit Type": record.activityUnitType,
        "Emission Factor (kg CO2e/unit)": record.emissionFactor,
        "EF Source": record.efSource,
        "Emission (tCO2e)": record.emissionTCO2e.toFixed(3),
        Calculation: record.calculation,
      });
      return acc;
    }, {} as Record<number, any[]>);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Add a sheet for each year
    Object.keys(groupedByYear).forEach((year) => {
      const worksheet = XLSX.utils.json_to_sheet(groupedByYear[parseInt(year)]);
      XLSX.utils.book_append_sheet(workbook, worksheet, `Year ${year}`);
    });

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `${category === "all" ? "All" : category}_Emissions_Data.xlsx`);
  };

  return (
    <div className="p-1 sm:p-2 min-h-screen bg-gray-100">
      <style jsx>{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: ${theme.primaryColor} #f1f1f1;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: ${theme.primaryColor};
          border-radius: 4px;
        }
        .modal-overlay {
          background-color: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
        }
      `}</style>
      <div
        className="max-w-full mx-auto rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md border"
        style={{ borderBottomColor: theme.primaryColor } as React.CSSProperties}
      >
        {/* Header */}
        <header
          className="flex flex-nowrap items-center justify-between border-b px-8 py-6"
          style={
            {
              borderBottomColor: theme.primaryColor,
              borderBottomWidth: "1px",
              borderStyle: "solid",
            } as React.CSSProperties
          }
        >
          <div className="flex flex-nowrap items-center space-x-5 min-w-0">
            <div
              className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl shadow-md"
              style={{ backgroundColor: theme.primaryColor, color: "#ffffff" } as React.CSSProperties}
            >
              <FaBolt className="fa-2x" />
            </div>
            <div className="min-w-0">
              <h1
                className="text-2xl font-extrabold leading-tight drop-shadow-sm truncate"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                {category === "all" ? "All Emissions Data" : `${category} Emissions Data`}
              </h1>
              <p
                className="text-sm font-medium tracking-wide truncate"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                Carbon footprint tracking for {category === "all" ? "various categories" : category.toLowerCase()}
              </p>
            </div>
          </div>
          <div className="flex flex-nowrap items-center space-x-8 min-w-0">
            <div className="text-right min-w-max">
              <p
                className="font-semibold uppercase tracking-wider text-xs whitespace-nowrap"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                Total Emissions
              </p>
              <p className="text-red-600 font-extrabold text-2xl leading-none drop-shadow-md whitespace-nowrap">
                {totalEmissions.toFixed(3)} tCO2e
              </p>
            </div>
            <div className="text-right min-w-max">
              <p
                className="font-semibold uppercase tracking-wider text-xs whitespace-nowrap"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                Total Records
              </p>
              <p
                className="font-extrabold text-2xl leading-none drop-shadow-md whitespace-nowrap"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                {filteredData.length}
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center px-5 py-2 border font-semibold rounded-lg shadow-md text-[#2c7873] border-[#2c7873] hover:bg-[#2c7873] hover:text-white transition duration-300 focus:outline-none focus:ring-4 focus:ring-[#2c7873]/50 whitespace-nowrap"
              onClick={() => setIsAddModalOpen(true)}
              aria-label="Add new record"
            >
              <FaPlus className="mr-2" /> Add
            </button>
          </div>
        </header>

        {/* Add Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Emissions Data"
        >
          <div className="space-y-5">
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 focus:ring-[#2c7873] focus:border-[#2c7873] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                Year
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 focus:ring-[#2c7873] focus:border-[#2c7873] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                Month
              </label>
              <select
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 focus:ring-[#2c7873] focus:border-[#2c7873] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              >
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                Input Date
              </label>
              <input
                type="date"
                name="inputDate"
                value={formData.inputDate}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 focus:ring-[#2c7873] focus:border-[#2c7873] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                Invoice/Bill
              </label>
              <input
                type="text"
                name="invoiceBill"
                value={formData.invoiceBill}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 focus:ring-[#2c7873] focus:border-[#2c7873] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                Activity Data
              </label>
              <input
                type="number"
                name="activityUnit"
                value={formData.activityUnit}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 focus:ring-[#2c7873] focus:border-[#2c7873] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                Activity Unit Type
              </label>
              <select
                name="activityUnitType"
                value={formData.activityUnitType}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 focus:ring-[#2c7873] focus:border-[#2c7873] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              >
                {unitTypes.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                Emission Factor (kg CO2e/unit)
              </label>
              <input
                type="number"
                name="emissionFactor"
                value={formData.emissionFactor}
                onChange={handleInputChange}
                step="0.001"
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 focus:ring-[#2c7873] focus:border-[#2c7873] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                EF Source
              </label>
              <input
                type="text"
                name="efSource"
                value={formData.efSource}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 focus:ring-[#2c7873] focus:border-[#2c7873] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 border rounded-lg text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              onClick={handleAddData}
              className="px-4 py-2 rounded-lg text-white font-semibold hover:bg-[#1f5a54] transition-colors duration-150"
              style={{ backgroundColor: theme.primaryColor } as React.CSSProperties}
            >
              Add Record
            </button>
          </div>
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedRecord(null);
          }}
          title="Edit Emissions Data"
        >
          <div className="space-y-5">
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 focus:ring-[#2c7873] focus:border-[#2c7873] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                Year
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 focus:ring-[#2c7873] focus:border-[#2c7873] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                Month
              </label>
              <select
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 focus:ring-[#2c7873] focus:border-[#2c7873] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              >
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                Input Date
              </label>
              <input
                type="date"
                name="inputDate"
                value={formData.inputDate}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 focus:ring-[#2c7873] focus:border-[#2c7873] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                Invoice/Bill
              </label>
              <input
                type="text"
                name="invoiceBill"
                value={formData.invoiceBill}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 focus:ring-[#2c7873] focus:border-[#2c7873] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                Activity Data
              </label>
              <input
                type="number"
                name="activityUnit"
                value={formData.activityUnit}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 focus:ring-[#2c7873] focus:border-[#2c7873] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                Activity Data Type
              </label>
              <select
                name="activityUnitType"
                value={formData.activityUnitType}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 focus:ring-[#2c7873] focus:border-[#2c7873] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              >
                {unitTypes.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                Emission Factor (kg CO2e/unit)
              </label>
              <input
                type="number"
                name="emissionFactor"
                value={formData.emissionFactor}
                onChange={handleInputChange}
                step="0.001"
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 focus:ring-[#2c7873] focus:border-[#2c7873] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium"
                style={{ color: theme.primaryColor } as React.CSSProperties}
              >
                EF Source
              </label>
              <input
                type="text"
                name="efSource"
                value={formData.efSource}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 p-3 focus:ring-[#2c7873] focus:border-[#2c7873] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedRecord(null);
              }}
              className="px-4 py-2 border rounded-lg text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              onClick={handleEditData}
              className="px-4 py-2 rounded-lg text-white font-semibold hover:bg-[#1f5a54] transition-colors duration-150"
              style={{ backgroundColor: theme.primaryColor } as React.CSSProperties}
            >
              Save Changes
            </button>
          </div>
        </Modal>

        {/* Delete Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedRecord(null);
          }}
          title="Delete Emissions Data"
        >
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Are you sure you want to delete the record for {selectedRecord?.month} {selectedRecord?.year} ({selectedRecord?.invoiceBill}) in {selectedRecord?.category}?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedRecord(null);
              }}
              className="px-4 py-2 border rounded-lg text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              onClick={() => selectedRecord && handleDeleteData(selectedRecord.id)}
              className="px-4 py-2 rounded-lg text-white font-semibold bg-red-600 hover:bg-red-700 transition-colors duration-150"
            >
              Delete
            </button>
          </div>
        </Modal>

        {/* View Details Modal */}
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedRecord(null);
          }}
          title="Emissions Data Details"
        >
          {selectedRecord && (
            <div className="space-y-4">
              <div>
                <span className="font-medium" style={{ color: theme.primaryColor } as React.CSSProperties}>
                  Category:
                </span>{" "}
                {selectedRecord.category}
              </div>
              <div>
                <span className="font-medium" style={{ color: theme.primaryColor } as React.CSSProperties}>
                  Year:
                </span>{" "}
                {selectedRecord.year}
              </div>
              <div>
                <span className="font-medium" style={{ color: theme.primaryColor } as React.CSSProperties}>
                  Month:
                </span>{" "}
                {selectedRecord.month}
              </div>
              <div>
                <span className="font-medium" style={{ color: theme.primaryColor } as React.CSSProperties}>
                  Input Date:
                </span>{" "}
                {formatDate(selectedRecord.inputDate)}
              </div>
              <div>
                <span className="font-medium" style={{ color: theme.primaryColor } as React.CSSProperties}>
                  Invoice/Bill:
                </span>{" "}
                {selectedRecord.invoiceBill}
              </div>
              <div>
                <span className="font-medium" style={{ color: theme.primaryColor } as React.CSSProperties}>
                  Activity Data:
                </span>{" "}
                {selectedRecord.activityUnit.toLocaleString()} {selectedRecord.activityUnitType}
              </div>
              <div>
                <span className="font-medium" style={{ color: theme.primaryColor } as React.CSSProperties}>
                  Emission Factor:
                </span>{" "}
                {selectedRecord.emissionFactor} kg CO2e/unit
              </div>
              <div>
                <span className="font-medium" style={{ color: theme.primaryColor } as React.CSSProperties}>
                  EF Source:
                </span>{" "}
                {selectedRecord.efSource}
              </div>
              <div>
                <span className="font-medium" style={{ color: theme.primaryColor } as React.CSSProperties}>
                  Emission:
                </span>{" "}
                {selectedRecord.emissionTCO2e.toFixed(3)} tCO2e
              </div>
              <div>
                <span className="font-medium" style={{ color: theme.primaryColor } as React.CSSProperties}>
                  Calculation:
                </span>{" "}
                {selectedRecord.calculation}
              </div>
            </div>
          )}
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => {
                setIsViewModalOpen(false);
                setSelectedRecord(null);
              }}
              className="px-4 py-2 border rounded-lg text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              Close
            </button>
          </div>
        </Modal>

        {/* Table */}
        <div className="overflow-x-auto scrollbar-thin">
          <table
            className="min-w-full divide-y text-sm whitespace-nowrap"
            style={{ divideColor: theme.primaryColor } as React.CSSProperties}
          >
            <thead style={{ backgroundColor: theme.primaryColor, color: "#ffffff" } as React.CSSProperties}>
              <tr>
                <th className="px-6 py-4 text-left font-bold text-xs tracking-wider uppercase">SR. NO.</th>
                <th className="px-6 py-4 text-left font-bold text-xs tracking-wider uppercase">YEAR</th>
                <th className="px-6 py-4 text-left font-bold text-xs tracking-wider uppercase">MONTH</th>
                <th className="px-6 py-4 text-left font-bold text-xs tracking-wider uppercase">CATEGORY</th>
                <th className="px-6 py-4 text-left font-bold text-xs tracking-wider uppercase">INPUT DATE</th>
                <th className="px-6 py-4 text-left font-bold text-xs tracking-wider uppercase">INVOICE/BILL</th>
                <th className="px-6 py-4 text-left font-bold text-xs tracking-wider uppercase">ACTIVITY Data</th>
                <th className="px-6 py-4 text-left font-bold text-xs tracking-wider uppercase">EMISSION FACTOR</th>
                <th className="px-6 py-4 text-left font-bold text-xs tracking-wider uppercase">EMISSION (TCO2E)</th>
                <th className="px-6 py-4 text-left font-bold text-xs tracking-wider uppercase">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white" style={{ divideColor: theme.primaryColor } as React.CSSProperties}>
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-6 py-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              ) : (
                currentData.map((record, index) => (
                  <tr
                    key={record.id}
                    className="hover:bg-[rgba(44,120,115,0.1)] transition-colors duration-200"
                  >
                    <td className="px-6 py-4 font-semibold">{startIndex + index + 1}</td>
                    <td className="px-6 py-4 font-semibold">{record.year}</td>
                    <td className="px-6 py-4">{record.month}</td>
                    <td className="px-6 py-4 font-semibold">{record.category}</td>
                    <td className="px-6 py-4">{formatDate(record.inputDate)}</td>
                    <td className="px-6 py-4">
                      <a href="#" className="font-semibold hover:underline" style={{ color: theme.primaryColor } as React.CSSProperties}>
                        {record.invoiceBill}
                      </a>
                    </td>
                    <td className="px-6 py-4 font-semibold" style={{ color: theme.primaryColor } as React.CSSProperties}>
                      {record.activityUnit.toLocaleString()} {record.activityUnitType}
                    </td>
                    <td className="px-6 py-4">{record.emissionFactor} kg CO2e/unit</td>
                    <td className="px-6 py-4 font-extrabold text-red-600">
                      {record.emissionTCO2e.toFixed(3)} tCO2e
                    </td>
                    <td className="px-6 py-4 text-center cursor-pointer select-none relative" style={{ color: theme.primaryColor } as React.CSSProperties}>
                      <button onClick={() => toggleMenu(record.id)} aria-label="Open actions menu for this record">
                        <FaEllipsisV />
                      </button>
                      <DropdownMenu
                        recordId={record.id}
                        isOpen={openMenuId === record.id}
                        onClose={() => setOpenMenuId(null)}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                        onViewDetails={handleViewDetailsClick}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <footer
          className="flex flex-nowrap items-center justify-between border-t px-8 py-5 rounded-b-2xl"
          style={{ borderTopColor: theme.primaryColor, backgroundColor: theme.primaryColor, color: "#ffffff" } as React.CSSProperties}
        >
          <div className="flex items-center space-x-4">
            <p className="text-xs sm:text-sm select-none whitespace-nowrap" style={{ color: "#ffffff" } as React.CSSProperties}>
              Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} records
            </p>
            <button
              type="button"
              className="inline-flex items-center px-5 py-2 border font-semibold rounded-lg shadow-md text-[#2c7873] bg-white border-[#2c7873] hover:bg-[#2c7873] hover:text-white transition duration-300 focus:outline-none focus:ring-4 focus:ring-[#2c7873]/50 whitespace-nowrap"
              onClick={handleExportData}
              aria-label="Export data to Excel"
            >
              <FaDownload className="mr-2" /> Export Data
            </button>
          </div>
          <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
            <button
              className={`relative inline-flex items-center px-5 py-2 text-sm font-medium ${
                currentPage === 1
                  ? "text-[#2c7873] bg-white border border-[#2c7873] rounded-l-md cursor-not-allowed"
                  : "text-[#2c7873] bg-white border border-[#2c7873] rounded-l-md hover:text-white hover:bg-[rgba(44,120,115,0.1)]"
              } select-none whitespace-nowrap`}
              disabled={currentPage === 1}
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              aria-label="Previous page"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                aria-current={currentPage === i + 1 ? "page" : undefined}
                className={`relative z-10 inline-flex items-center px-5 py-2 text-sm font-medium ${
                  currentPage === i + 1
                    ? "text-white bg-[#2c7873] border border-[#2c7873] cursor-default"
                    : "text-[#2c7873] bg-white border border-[#2c7873] hover:text-white hover:bg-[rgba(44,120,115,0.1)]"
                } select-none whitespace-nowrap`}
                onClick={() => handlePageChange(i + 1)}
                aria-label={`Go to page ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              className={`relative inline-flex items-center px-5 py-2 text-sm font-medium ${
                currentPage === totalPages
                  ? "text-[#2c7873] bg-white border border-[#2c7873] rounded-r-md cursor-not-allowed"
                  : "text-[#2c7873] bg-white border border-[#2c7873] rounded-r-md hover:text-white hover:bg-[rgba(44,120,115,0.1)]"
              } select-none whitespace-nowrap`}
              disabled={currentPage === totalPages}
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              aria-label="Next page"
            >
              Next
            </button>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default Electricity;