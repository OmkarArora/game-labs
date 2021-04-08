import { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "shoto-ui";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    openStatus: false,
    type: null,
    data: null,
  });

  const value = {setSnackbar}

  return (
    <AlertContext.Provider value={value}>
      {children}
      <Snackbar
        onClose={() => setSnackbar(false)}
        open={snackbar.openStatus}
        autoHideDuration={3000}
      >
        <Alert
          severity={snackbar.type}
          onClose={() =>
            setSnackbar((prev) => ({ ...prev, openStatus: false }))
          }
        >
          {snackbar.data && snackbar.data}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};
