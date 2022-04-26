import React from "react";
import errrorImage from "../../Images/no-result-found-plzjaev368yh9z4dtefdm0dh8ryyv1dn832r9dy1b4.webp";

function NotFound() {
	return (
		<div
			style={{
				margin: "auto",
				alignItems: "center",
			}}>
			<img
				style={{ width: "400px", borderRadius: "10px" }}
				src={errrorImage}
				alt=""
			/>
		</div>
	);
}

export default NotFound;
