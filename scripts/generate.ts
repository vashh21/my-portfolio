import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { DocumentInterface } from "@langchain/core/documents";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { getEmbeddingsCollection, getVectorStore } from "../src/lib/supabase";

async function generateEmbeddings() {
  try {
    console.log("Starting embeddings generation...");
    const vectorStore = await getVectorStore();

    // Clear existing documents from Supabase
    console.log("Clearing existing documents...");
    const { error } = await (await getEmbeddingsCollection()).delete().neq("id", 0);
    if (error) {
      console.error("Error clearing documents:", error);
      return;
    }

    // Load resume data
    console.log("Loading resume data...");
    const loader = new JSONLoader(
      "src/data/resumeDtata.json",
      ["/personalInfo", "/experience", "/education", "/skills", "/projects", "/interests"]
    );

    const docs = await loader.load();
    console.log(`Loaded ${docs.length} documents`);

    const processedDocs = docs.map((doc): DocumentInterface => {
      return {
        pageContent: doc.pageContent,
        metadata: {
          source: "resume",
          section: doc.metadata.source,
        },
      };
    });

    console.log("Splitting documents...");
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const splitDocs = await splitter.splitDocuments(processedDocs);
    console.log(`Split into ${splitDocs.length} chunks`);

    console.log("Adding documents to vector store...");
    await vectorStore.addDocuments(splitDocs);

    console.log("Resume embeddings generated successfully!");
  } catch (error) {
    console.error("Error generating embeddings:", error);
    throw error;
  }
}

generateEmbeddings().catch(console.error);
