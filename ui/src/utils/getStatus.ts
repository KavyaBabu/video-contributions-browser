export interface Status {
    label: string;
    bgColor: string;
  }
  
  export const getContributionStatus = (startTime: string, endTime: string): Status => {
    const now = Date.now();
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
  
    if (now < start) return { label: "Scheduled", bgColor: "#fff4e5" };
    if (now <= end) return { label: "Active", bgColor: "#edf7ed" };
    return { label: "Complete", bgColor: "#e5f6fd" };
  };
  