export interface SearchDocument {
    id: number;
    name: string;
    type: "document"; // <-- uniquely identifies a document
  }
  
  export interface SearchFolder {
    id: number;
    name: string;
    type: "folder"; // <-- uniquely identifies a folder
  }
  
  export type SearchResult = SearchDocument | SearchFolder;
  