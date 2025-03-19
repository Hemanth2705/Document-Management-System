export interface CreateDocumentDTO {
    name: string;
    type: string;
    folder_id: number | null;
  }
  
  export interface Document {
    id: number;
    name: string;
    type: string;
    folder_id: number | null;
  }
  