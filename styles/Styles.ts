import { StyleSheet } from "react-native";
import { ERROR_COLOR, SUCCESS_COLOR } from "@/constants/Colors";

export const formStyle = StyleSheet.create({
  form: {
    paddingTop: 30,
    paddingHorizontal: 30,
    width: '90%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  errorMessage: {
    color: ERROR_COLOR,
    marginRight: "auto",
    fontSize: 16
  },
  textInput: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#d3d3d3',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 15
  },
  label: {
    fontSize: 20,
    marginRight: 'auto'
  },
  submitButton: {
    marginLeft: 'auto',
    marginVertical: 10,
  },
  submitButtonText: {
    backgroundColor: SUCCESS_COLOR,
    color: "#fff",
    fontSize: 17,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15
  }
})