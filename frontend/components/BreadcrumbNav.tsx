import React from "react";
import { FaChevronRight, FaHome } from "react-icons/fa";
import styled from "styled-components";
import { Folder } from "../types/folder";

const BreadcrumbContainer = styled.nav`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text || "#555"};
  margin-bottom: 15px;
  background: ${({ theme }) => theme.colors.white || "#fff"};
  padding: 10px;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
`;

const BreadcrumbItem = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary || "#007bff"};
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

interface BreadcrumbNavProps {
  folders: Folder[];
  currentFolderId: number | null;
  onFolderClick: (folderId: number | null) => void;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ folders, currentFolderId, onFolderClick }) => {
  // 🔥 Filter breadcrumb path to show only the correct hierarchy
  const breadcrumbPath: Folder[] = [];
  let folder = folders.find(f => f.id === currentFolderId);

  while (folder) {
    breadcrumbPath.unshift(folder);
    folder = folders.find(f => f.id === folder?.parent_folder_id);
  }

  return (
    <BreadcrumbContainer>
      <BreadcrumbItem onClick={() => onFolderClick(null)}>
        <FaHome /> Home
      </BreadcrumbItem>

      {breadcrumbPath.map((folder, index) => (
        <React.Fragment key={folder.id}>
          <FaChevronRight />
          <BreadcrumbItem onClick={() => onFolderClick(folder.id)}>
            {folder.name}
          </BreadcrumbItem>
        </React.Fragment>
      ))}
    </BreadcrumbContainer>
  );
};

export default BreadcrumbNav;
