import { Styles } from "../home/Homepage-styles";

export const blogStyles: Styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        gap: 10,
        flexWrap: "wrap",
        mt: 1,
        mb: 1,
    },
    card: {
        display: "flex",
        flexDirection: "column",
        height: "70vh",
        transition: "transform 1s",
        ":hover": {
            transform: "scale(1.02)",
            boxShadow: "10px 10px 20px #ccc",
        }
    },
    cardHeader: {
        fontFamily: "Work Sans",
        fontSize: "72px",
        height: "35%",
        padding: 1,
    },
    cardContent: {
        width: "80%",
        height: "100%",
        fontSize: "20px",
        fontWeight: "500",
    },
    title: {
        fontWeight: "600",
        m: 1,
        color: "white",
        textTransform: "uppercase",
        textDecoration: "underline",
        textUnderlineOffset: "5px",
        fontFamily: "Work Sans",
        textShadow: "2px 7px 20px #ccc",
    },
    contentText: {
        padding: 2,
        fontSize: "20px",
        fontWeight: "500",
    }

}