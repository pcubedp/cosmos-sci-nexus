import { useState, useCallback } from "react";
import { toast } from "sonner";

export interface Publication {
  id: string;
  title: string;
  summary: string;
  date: string;
  authors: string;
  experimentType: string;
  outcome: string;
  keyConcepts?: string[];
  abstract?: string;
  methods?: string;
  results?: string;
  impacts?: string;
}

export interface GraphNode {
  id: string;
  label: string;
  publicationId: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  sharedConcepts: number;
  label: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  publications: Record<string, Publication>;
}

export const usePublications = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPublications = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`https://YOUR_API_URL/api/publications/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch publications");
      }
      
      const data = await response.json();
      setPublications(data.publications || []);
      
      if (data.publications?.length === 0) {
        toast.info("No publications found matching your search");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
      setPublications([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchRelatedPublications = useCallback(async (publicationId: string): Promise<GraphData | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`https://YOUR_API_URL/api/related/${publicationId}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch related publications");
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    publications,
    isLoading,
    error,
    searchPublications,
    fetchRelatedPublications,
  };
};
