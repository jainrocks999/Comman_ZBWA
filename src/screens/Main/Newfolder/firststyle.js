import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F9F4F1" }, 
    main: { paddingHorizontal: 24, marginTop: 10 },
    // heading: { color: "#000000", fontSize: width * 0.04, marginTop: 15 },
    heading: { fontSize: 16, fontWeight: "bold", marginBottom: 0 , color:'#000', marginTop: 10 },

    input: {
        height: 40,
        borderWidth: 1,
        borderColor: "#FFD387",
        marginTop: 5,
        paddingHorizontal: 8,
         backgroundColor: "#FFFFFF"
    },
    uploadButton: {
        backgroundColor: "#FCDA64",
        borderRadius: 10,
        marginTop: 10,
        alignItems: "center",
        paddingVertical: 11,
    },
    uploadText: { color: "#000000", fontSize: width * 0.04 },
    photoContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
        justifyContent: "flex-start",
    },
    
    photo: {
        width: width * 0.23,
        height: width * 0.23,
        borderRadius: 10,
        resizeMode: "contain",
        marginBottom: 10,
        marginRight: 10,
    },
    imageWrapper1:{
        position: "relative",
        marginRight: 10,
        marginBottom: 10,
        marginTop: 25,
        width: width * 0.23,
        height: width * 0.23,
    },
    imageWrapper: {
        position: "relative",
        marginRight: 10,
        marginBottom: -20,
        marginTop: 65,
        width: width * 0.23,
        height: width * 0.23,
    },
    imageWrapper3:{
        position: "relative",
        marginRight: 10,
        marginBottom: 5,
        marginTop: 65,
        width: width * 0.23,
        height: width * 0.23, 
    },
    deleteButton2: {
        position: "absolute",
        top: -8,
        right: -5,
        backgroundColor: "red",
        width: width * 0.05,
        height: width * 0.05,
        borderRadius: (width * 0.05) / 2,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
    },
    deleteText: { color: "white", fontSize: 12 },
    touch1: {
        backgroundColor: "#FCDA64",
        borderRadius: 10,
        marginTop: 70,
        alignItems: "center",
        paddingVertical: 12,
        marginBottom: 20,
    },
    text: { color: "#000000", fontSize: width * 0.04 },
    modalContainer: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    modalImage: {
        resizeMode: "contain",
        width: "90%",
        height: "80%",
        borderRadius: 10,
    },
    deleteButton1: {
        position: "absolute",
        top: 60,
        right: 10,
        backgroundColor: "red",
        width: width * 0.08,
        height: width * 0.08,
        borderRadius: (width * 0.08) / 2,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
    },
    deleteText1: {
        color: "white",
        fontSize: width * 0.05,
        fontWeight: "bold",
    },
    optionModal: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    optionContainer: {
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalHeading: {
        fontSize: width * 0.05,
        color: "#000000",
        fontWeight: "bold",
        marginBottom: 15,
    },
    optionButton: {
        backgroundColor: "#FCDA64",
        borderRadius: 10,
        marginTop: 10,
        alignItems: "center",
        paddingVertical: 12,
    },
    optionText: {
        color: "#000000",
        fontSize: width * 0.04,
    },
    cancelButton: {
        marginTop: 20,
        alignItems: "center",
        paddingVertical: 12,
    },
    cancelText: {
        color: "#FF0000",
        fontSize: width * 0.04,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    imageSizeText: {
        marginTop: -12,
        color: "#A9A9A9",
        fontSize: width * 0.03,
        marginLeft: 10,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: "#000", 
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        backgroundColor: "#FFF", 
    },
    
    imageLabelInput: {
        marginTop:-4,
        height: 40,
        borderWidth: 1,
        borderColor: "#FCDA64",
        paddingHorizontal: 8,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#000',
        fontSize: 14,
      },
      
    checked: {
        width: 14, 
        height: 14,
        backgroundColor: "#000", 
        borderRadius: 3, 
    },
    
    checkboxLabel: {
        fontSize: 16,
        color: "#000",
    },
    
    dropdown: {
        height: 40,
        borderWidth: 1,
        borderColor: "#FCDA64",
        marginTop: 5,
        paddingHorizontal: 8,
        justifyContent: "center",
    },
    
    dropdownText: {
        color: "#888",
        fontSize: 12, 
    },
    
    dropdownTextSelected: {
        fontSize: 12,
        fontWeight: "bold",
    },
    
    dropdownList: {
        borderWidth: 1,
        borderColor: "#FCDA64",
        paddingVertical: 5,
        borderTopWidth: 0, 
    },
    
    dropdownItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#FCDA64",
    },
    
    dropdownItemText: {
        marginLeft: 10,
        fontSize: 12, 
    },
    
    manualInput: {
        height: 40, 
        borderWidth: 1,
        borderColor: "#FCDA64",
        paddingHorizontal: 8,
        borderRadius: 5,
        fontSize: 12,
        marginVertical: 5,
    },
    
    optionButton: {
        backgroundColor: "#FCDA64",
        paddingVertical: 8, 
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        marginHorizontal: 10, 
        width: "auto", 
    },
    
    optionText: {
        color: "#000",
        fontSize: 14, 
        fontWeight: "bold",
    },
    
});

export default styles;
