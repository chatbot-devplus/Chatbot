import { createContext, useState } from "react";
import runChat from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
	
	const [input, setInput] = useState("");
	const [recentPrompt, setRecentPrompt] = useState("");
	const [prevPrompts, setPrevPrompts] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const [loading, setLoading] = useState(false);
	const [resultData, setResultData] = useState("");

    const newChat = () =>{
        setLoading(false);
        setShowResults(false)
    }

	const onSent = async (prompt) => {
		setResultData("");
		setLoading(true);
		setShowResults(true);
		let response;
	
		if (prompt !== undefined) {
			response = await runChat(prompt);
			setRecentPrompt(prompt);
		} else {
			setPrevPrompts(prev => [...prev, input]);
			setRecentPrompt(input);
			response = await runChat(input);
		}
	
		try {
			if (response.includes("|")) {
				const rows = response.trim().split("\n");
				let tableHTML = "<table border='5' style='border: 2px solid black; border-collapse: collapse; width: 100%; text-align: center;margin:10px;'>";
	
				rows.forEach((row, index) => {
					const columns = row.split("|").map(col => col.trim()); 
					if (index === 0) {
						tableHTML += "<thead><tr>";
						columns.forEach(col => {
							if (col) tableHTML += `<th style="border: 1px solid black;text-align: center;margin:10px;">${col}</th>`;
						});
						tableHTML += "</tr></thead><tbody>";
					} else if (index > 1) {
						tableHTML += "<tr>";
						columns.forEach(col => {
							if (col) tableHTML += `<td style="border: 1px solid black;text-align: center;margin:10px;">${col}</td>`;
						});
						tableHTML += "</tr>";
					}
				});
	
				tableHTML += "</tbody></table>";
				setResultData(tableHTML);
			} else {
				let responseArray = response.split("**");
				let newResponse = "";
	
				for (let i = 0; i < responseArray.length; i++) {
					if (i === 0 || i % 2 !== 1) {
						newResponse += responseArray[i];
					} else {
						newResponse += "<b>" + responseArray[i] + "</b>";
					}
				}
				newResponse = newResponse.replace(/(\d+\.\s[^.]+?)(?=\d+\.\s|$)/g, "<li>$1</li>");
				newResponse = "<ul>" + newResponse + "</ul>";
				newResponse = newResponse.split("*").join("<br/>");
				newResponse = newResponse.replace(/<\/table>/g, "</table><br/>");
				newResponse = newResponse.replace(/<\/ul>/g, "</ul><br/>");
				setResultData(newResponse);
			}
		} catch (error) {
			console.error("Error while running chat:", error);
		} finally {
			setLoading(false);
			setInput("");
		}
	};
	const contextValue = {
		prevPrompts,
		setPrevPrompts,
		onSent,
		setRecentPrompt,
		recentPrompt,
		input,
		setInput,
		showResults,
		loading,
		resultData,
		newChat,
	};

	return (
		<Context.Provider value={contextValue}>{props.children}</Context.Provider>
	);
};

export default ContextProvider;
