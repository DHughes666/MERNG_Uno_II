import { Styles } from "../home/Homepage-styles"


export const headerStyles:Styles = {
    appBar: {
        position: "sticky",
        bgcolor: "#404040"
    },
    tabContainer: {
        width: "100%",
        marginLeft: "auto",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    authBtn: {
        ml: 2,
        bgcolor: "#d27e20",
        color: "white",
        borderRadius: 20,
        width: 90,
        ":hover": {
            bgcolor: "#ff9400",
        }
    }
}