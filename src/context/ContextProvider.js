import { createContext, useState } from "react";

export const UserContext = createContext(null);

const ContextProvider = ({ children }) => {
	const [account, setAccount] = useState(false);
	return (
		<UserContext.Provider value={{ account, setAccount }}>
			{children}
		</UserContext.Provider>
	);
};

export default ContextProvider;
