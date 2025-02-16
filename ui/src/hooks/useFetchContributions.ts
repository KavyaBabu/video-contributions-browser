import { useState, useEffect } from "react";
import { Contribution, getContributionStatus } from "../utils/getStatus";

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
        const response = await fetch(
          `http://127.0.0.1:8000/contributions/?skip=${skip}&limit=${contributionsPerPage}&title=${searchTerm}&order_by=${filters.sort}`
        );
        const data = await response.json();

        let filteredData = data.contributions;
        if (filters.status !== "all") {
          filteredData = filteredData.filter(
            (contribution: Contribution) =>
              getContributionStatus(contribution.startTime, contribution.endTime).label.toLowerCase() === filters.status
          );
        }

        setContributions(filteredData);
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
