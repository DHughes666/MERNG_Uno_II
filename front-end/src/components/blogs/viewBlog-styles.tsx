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
    },
    blogDate: {
        ml: 'auto', 
        display: "flex", 
        gap:2, 
        alignItems: "center"
    },
    avatarr: {
        padding: 1,
        color: "red",
        bgcolor: "transparent",
    },
    commentBox: {
        padding: 4,
        display: "flex", 
        alignItems: "center",   
        gap: 2,
    },
    commentInputContainer: {
        padding: 2,
        width: "30%",
        height: "40%",
    },
    inputLayout: {
        display: "flex",
        gap: 2,
        alignItems: "center",
    },
    textField: {
        width: "100%",
    },
    commentItem: {
        display: "flex",
        padding: 1,
        gap: 1,
        borderBottom: "1px solid black",
        margin: 1,
        alignItems: "center",
        height: "auto",
    },
    commentText: {
        margin: 2,
        fontWeight: "600",
        fontSize: "16px",
        fontFamily: "arvo",
    },
    comments: {
        display: "flex",
        flexDirection: "column",
        
    },
} 