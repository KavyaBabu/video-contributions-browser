export interface Status {
    label: string;
    bgColor: string;
  }
  
  export const getContributionStatus = (startTime: string, endTime: string): Status => {
    const now = Date.now();
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
  
    if (now < start) return { label: "Scheduled", bgColor: "#C4A5DB" };
    if (now <= end) return { label: "Active", bgColor: "#14c2a1" };
    return { label: "Complete", bgColor: "#07CCF6" };
  };
  