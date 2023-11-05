import { Styles } from "../home/Homepage-styles";

export const blogPageStyles: Styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: 2,
    },
    profileHeader: {
        display: "flex",
        flexDirection: "column",
        padding: 1,

    },
    profileHeaderItems: {
        display: "flex",
        alignItems: "center",
        padding: 1,
        gap: 2,
    },
    headerText: {
        fontFamily: "Arvo",
    },
    blogTitle: {
        fontSize: "30px",
        textAlign: "center",
        fontFamily: "Arvo",
        fontweight: "700",
        textShadow: "2px 2px 12px #ccc",
    },
    blogContent: {
        textShadow: "1px 1px 6px #ccc",
        padding: 5,
        fontSize: "20px",
        textAlign: "justify",
        fontFamily: "Work Sans",
    }
} 