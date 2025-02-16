import { useState, useEffect } from "react";
import { Contribution } from "../utils/types";

export const useFetchContributions = (searchTerm: string, page: number, filters: any) => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const contributionsPerPage = 14;

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        const skip = (page - 1) * contributionsPerPage;
        
        const params = new URLSearchParams({
          skip: skip.toString(),
          limit: contributionsPerPage.toString(),
          order_by: filters.sort,
        });

        if (searchTerm) {
          params.append('title', searchTerm);
          params.append('description', searchTerm);
          params.append('owner', searchTerm);
          params.append('match', 'any');
        }
        
        const now = new Date().toISOString();
        switch (filters.status) {
          case 'active':
            params.append('startBefore', now);
            params.append('endAfter', now);
            break;
          case 'scheduled':
            params.append('startAfter', now);
            break;
          case 'complete':
            params.append('endBefore', now);
            break;
        }

        const response = await fetch(
          `http://127.0.0.1:8000/contributions/?${params.toString()}`
        );
        
        const data = await response.json();
        
        setContributions(data.contributions);
        setTotalPages(Math.ceil(data.total / contributionsPerPage));
      } catch (error) {
        console.error("Error fetching contributions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [page, searchTerm, filters]);

  return { contributions, loading, totalPages };
};
