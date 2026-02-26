export const getBackgroundColor = (productTypeColor) => {
	switch (productTypeColor) {
		case "xbox":
			return "#63B95D";
		case "playstation":
			return "#1761BF";
		case "nintendo":
			return "#F34040";
		default:
			return "white";
	}
};
