"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import AddDocumentForm from "../components/AddDocumentForm";
import AddFolderForm from "../components/AddFolderForm";
import BreadcrumbNav from "../components/BreadcrumbNav";
import SearchBox from "../components/SearchBox";
import { CreateFolderDTO, Folder } from "../types/folder";
import { CreateDocumentDTO, Document } from "../types/document";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: ${(props) => props.theme.spacing.large};
  background: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.large};
`;

export default function Home() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<number | null>(null);
  const [searchResults, setSearchResults] = useState<(Document | Folder)[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [currentFolderId]);

  const fetchData = async () => {
    try {
      const [docsRes, foldersRes] = await Promise.all([
        axios.get<Document[]>(`${API_URL}/documents`),
        axios.get<Folder[]>(`${API_URL}/folders`),
      ]);
      setDocuments(docsRes.data);
      setFolders(foldersRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch documents and folders.");
    }
  };

  return (
    <Container>
      <h1>📁 Documents Management System</h1>
      <SearchBox onSearch={(query) => console.log("Searching for:", query)} />
      <BreadcrumbNav folders={folders} onFolderClick={setCurrentFolderId} />

      <Section>
        <h2>Folders</h2>
        <ul>
          {folders.length === 0 ? (
            <li>📂 No Folders Available</li>
          ) : (
            folders.map((folder) => (
              <li key={folder.id} onClick={() => setCurrentFolderId(folder.id)}>
                📂 {folder.name}
              </li>
            ))
          )}
        </ul>
      </Section>

      <Section>
        <h2>Documents</h2>
        <ul>
          {documents.length === 0 ? (
            <li>📄 No Documents Available</li>
          ) : (
            documents.map((doc) => (
              <li key={doc.id}>📄 {doc.name} ({doc.type})</li>
            ))
          )}
        </ul>
      </Section>

      <Section>
        <h2>Add New Folder</h2>
        <AddFolderForm onSubmit={() => {}} currentFolderId={currentFolderId} folders={folders} />
      </Section>

      <Section>
        <h2>Add New Document</h2>
        <AddDocumentForm onSubmit={() => {}} currentFolderId={currentFolderId} folders={folders} />
      </Section>

      {error && <p className="error">{error}</p>}
    </Container>
  );
}