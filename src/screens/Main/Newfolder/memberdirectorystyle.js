import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        // backgroundColor:'#FFFFFF'
    },
    container: {
        flex: 1,
        padding: 20,
        // marginTop: -5
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: "#333",
        marginBottom: 5,
        fontWeight: "600",
    },
    input: {
        height: 50,
        borderColor: "#FFD387",
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 12,
        fontSize: 15,
        backgroundColor: "#FFF",
        color: "#333",
    },
    textArea: {
        height: 75,
        textAlinVertical: "top",
    },
    dropdown: {
        height: 50,
        borderColor: "#FFD387",
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 12,
        justifyContent: "center",
        backgroundColor: "#FFF",
    },
    dropdownText: {
        fontSize: 15,
        color: "#888",
    },
    dropdownTextSelected: {
        fontSize: 15,
        color: "#333",
    },
    dropdownList: {
        marginTop: 5,
        borderWidth: 2,
        borderColor: "#FCDA64",
        backgroundColor: "#FFF",
        borderRadius: 10,
        paddingVertical: 5,
        shadowColor: "#000",
        elevation: 4,
    },
    dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#FCDA64",
    },
    dropdownItemLast: {
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
    dropdownItemText: {
        fontSize: 15,
        color: "#333",
    },
    companyCard: {
        backgroundColor: "#F9F4F1",
        borderRadius: 12,
        padding: 10,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: "#FFD387",
        elevation: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    companyLogo: {
        resizeMode: 'contain',
        width: 70,
        height: 70,
        marginRight: 10,
        borderColor: "#FCDA64",
    },
    companyInfo: {
        flex: 1,
    },
    companyName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    companyDescription: {
        fontSize: 14,
        color: "#000",
        marginVertical: 1,
    },
    companyContact: {
        fontSize: 14,
        color: "#000",
        marginVertical: 5,
    },
    companyAddress: {
        fontSize: 13,
        color: "#000",
    },
    noProfilesContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    noProfilesText: {
        color: "#777",
        fontSize: 16,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#888",
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    checkboxSelected: {
        width: 18,
        height: 18,
        borderRadius: 4,
        backgroundColor: "#FCDA64",
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    innerSquare: {
        width: 10,
        height: 10,
        backgroundColor: "#000",
        borderRadius: 2,
    },
    dropdownContainer: {
        // position: "absolute",
        top: 5,
        left: 0,
        right: 0,
        backgroundColor: "#FFF",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#FCDA64",
        zIndex: 999,
    },
    scrollableDropdown: {
        maxHeight: 180,
    },
    doneButton: {
        // backgroundColor: "#FCDA64",
        paddingVertical: 10,
        alignItems: "center",
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8,
        width: "100%",
        alignSelf: "center",
        elevation: 3,
    },
    doneButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
    },
     inputView: {
    height: 38,
    width: '100%',
    // marginTop: 5,
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  infoDetailSection: {
    borderWidth: 1,
    marginVertical: 18,
    padding: 20,
    // borderRadius: 10,
    // height:20,
    backgroundColor: '#F9F4F1',
    borderColor: '#FFD387',
  },
   HeadingText: {
    paddingHorizontal:15,
    marginVertical: 10,
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold',
    color: '#EEAF2D',
    marginBottom: -5
  },
});

export default styles;





