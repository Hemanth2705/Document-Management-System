export interface CreateFolderDTO {
    name: string;
    parent_folder_id: number | null;
  }  
  
  export interface Folder {
    id: number;
    name: string;
    parent_folder_id: number | null;
    type: "folder"; // ✅ Add this
  }
  
  