import { createContext, useContext, useState } from "react";

// 1. CREATE the context
const ReadingStatusContext = createContext({
  statuses: {},
  updateStatus: () => {},
});

// 2. BUILD the Provider component
export function ReadingStatusProvider({ children }) {
  const [statuses, setStatuses] = useState(() => {
    const saved = localStorage.getItem("readingStatuses");
    return saved ? JSON.parse(saved) : {};
  });

  const updateStatus = (bookId, status) => {
    const updated = { ...statuses, [bookId]: status };
    setStatuses(updated);
    localStorage.setItem("readingStatuses", JSON.stringify(updated));
  };

  return (
    <ReadingStatusContext.Provider value={{ statuses, updateStatus }}>
      {children}
    </ReadingStatusContext.Provider>
  );
}

// 3. BUILD a Custom hook to consume the context
export function useReadingStatus() {
  return useContext(ReadingStatusContext);
}
