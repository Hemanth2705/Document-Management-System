import React from 'react';
import { FaChevronRight, FaHome } from 'react-icons/fa';
import { Folder } from '../types/folder';

interface BreadcrumbNavProps {
  folders: Folder[];
  onFolderClick: (folderId: number | null) => void;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ folders, onFolderClick }) => {
  return (
    <nav>
      <span onClick={() => onFolderClick(null)}>
        <FaHome /> Home
      </span>
      {folders.map((folder, index) => (
        <React.Fragment key={folder.id}>
          <FaChevronRight />
          <span onClick={() => onFolderClick(folder.id)}>{folder.name}</span>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbNav;
