"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaSearch, FaFolder, FaFileAlt, FaUpload, FaPlus, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AddDocumentForm from "../components/AddDocumentForm";
import AddFolderForm from "../components/AddFolderForm";
import Modal from "../components/Modal"; // ✅ Fixed import
import { CreateDocumentDTO } from "@/types/document";
import { CreateFolderDTO } from "@/types/folder";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

const Container = styled.div`
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 26px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  margin: 15px auto;
  background: white;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-right: none;
  border-radius: 5px 0 0 5px;
  font-size: 16px;
  background: white;
  outline: none;
`;

const SearchButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 12px;
  width: 50px;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const TableHeader = styled.th`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  text-align: left;
  padding: 12px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f8f9fa; /* 🟢 Light gray rows */
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  gap: 10px;
`;

const PageText = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

const PaginationButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 6px 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [documents, setDocuments] = useState<
  { id: number; name: string; createdBy: string; date: string; size?: string }[]
>([]);

const [folders, setFolders] = useState<
  { id: number; name: string; createdBy: string; date: string }[]
>([]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const [foldersRes, documentsRes] = await Promise.all([
        axios.get(`${API_URL}/folders`),
        axios.get(`${API_URL}/documents`)
      ]);
  
      console.log("Fetched folders:", foldersRes.data); // Debugging output
      console.log("Fetched documents:", documentsRes.data); // Debugging output
  
      setFolders(foldersRes.data || []); // Ensure folders is always an array
      setDocuments(documentsRes.data || []); // Ensure documents is always an array
  
    } catch (err) {
      console.error("Error fetching data:", err);
      setFolders([]); // Prevent undefined state for folders
      setDocuments([]); // Prevent undefined state for documents
    }
  };
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload
  
    if (!searchTerm.trim()) {
      fetchData(); // If search is empty, reload all data
      return;
    }
  
    try {
        const res = await axios.get(`${API_URL}/search?q=${searchTerm}`);
        console.log("🔍 Search API Response:", res.data); // ✅ Debugging output
    
        if (res.data.length > 0) {
          // ✅ Separate folders and documents
          const filteredFolders = res.data.filter((item: any) => item.type === "folder");
          const filteredDocuments = res.data.filter((item: any) => item.type === "document");
    
          setFolders(filteredFolders);
          setDocuments(filteredDocuments);
        } else {
          setFolders([]); // ✅ If no results, reset state
          setDocuments([]);
        }
      } catch (err) {
        console.error("❌ Search error:", err);
      }
    };
  
  

  return (
    <Container>
      {/* Header */}
      <Header>
        <Title>Document Management System</Title>
        <ButtonGroup>
          <Button onClick={() => setShowUploadModal(true)}>
            <FaUpload /> Upload files
          </Button>
          <Button onClick={() => setShowFolderModal(true)}>
            <FaPlus /> Add new folder
          </Button>
        </ButtonGroup>
      </Header>

      {/* Search Bar */}
      <form onSubmit={handleSearch}>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search documents and folders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchButton type="submit">
            <FaSearch />
          </SearchButton>
        </SearchContainer>
      </form>

      {/* ✅ Re-added Table */}
      <Table>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Created by</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>File size</TableHeader>
          </tr>
        </thead>
        <tbody>
          {/* Folders */}
          {folders.length > 0 ? (
            folders.map((folder) => (
                <TableRow key={folder.id}>
                <TableCell>
                    <FaFolder style={{ marginRight: 5 }} /> {folder.name}
                </TableCell>
                <TableCell>{folder.createdBy || "Unknown"}</TableCell>
                <TableCell>{folder.date || "N/A"}</TableCell>
                <TableCell>-</TableCell>
                </TableRow>
            ))
            ) : (
            <TableRow>
                <TableCell colSpan={4} style={{ textAlign: "center" }}>No folders found</TableCell>
            </TableRow>
            )}

            {documents.length > 0 ? (
            documents.map((doc) => (
                <TableRow key={doc.id}>
                <TableCell>
                    <FaFileAlt style={{ marginRight: 5 }} /> {doc.name}
                </TableCell>
                <TableCell>{doc.createdBy || "Unknown"}</TableCell>
                <TableCell>{doc.date || "N/A"}</TableCell>
                <TableCell>{doc.size || "1 KB"}</TableCell>
                </TableRow>
            ))
            ) : (
            <TableRow>
                <TableCell colSpan={4} style={{ textAlign: "center" }}>No documents found</TableCell>
            </TableRow>
            )}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination>
        {currentPage > 1 && (
          <PaginationButton onClick={() => setCurrentPage(currentPage - 1)}>
            <FaArrowLeft /> Previous
          </PaginationButton>
        )}
        <PageText>Page {currentPage} of {totalPages}</PageText>
      </Pagination>

      {/* Modals */}
      {showUploadModal && <Modal isOpen={showUploadModal} title="Upload Files" onClose={() => setShowUploadModal(false)}><AddDocumentForm onSubmit={function (values: CreateDocumentDTO): void {
              throw new Error("Function not implemented.");
          } } currentFolderId={null} folders={[]} /></Modal>}
      {showFolderModal && <Modal isOpen={showFolderModal} title="Add Folder" onClose={() => setShowFolderModal(false)}><AddFolderForm onSubmit={function (values: CreateFolderDTO): void {
              throw new Error("Function not implemented.");
          } } currentFolderId={null} /></Modal>}
    </Container>
  );
}
