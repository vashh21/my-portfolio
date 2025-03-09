import { Document } from "langchain/document";
import { BaseDocumentLoader } from "langchain/document_loaders/base";


export interface CustomDocument {
  pageContent: string;
  metadata: {
    source: string;
  };
}

export class CustomJSONLoader extends BaseDocumentLoader {
  constructor(private filePath: string, private jsonPaths: string[]) {
    super();
  }

  async load(): Promise<CustomDocument[]> {
    const data = require(this.filePath);
    const documents: CustomDocument[] = [];

    for (const path of this.jsonPaths) {
      if (data[path]) {
        documents.push({
          pageContent: JSON.stringify(data[path]),
          metadata: { source: path },
        });
      }
    }

    return documents;
  }
}
