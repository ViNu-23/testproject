import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

const Login = ({ navigation, route }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [isAccountCreated, setIsAccountCreated] = useState(false);
    const isFocused = useIsFocused();
  
    useEffect(() => {
      if (isFocused && route.params?.isAccountCreated) {
        setIsAccountCreated(true);
        setTimeout(() => {
          setIsAccountCreated(false);
        }, 4500); // Disappear after 3.5 seconds
      }
    }, [isFocused, route.params?.isAccountCreated]);
  
    useEffect(() => {
      if (route.params?.phoneNumber && route.params?.password) {
        setPhoneNumber(route.params.phoneNumber);
        setPassword(route.params.password);
      }
    }, [route.params?.phoneNumber, route.params?.password]);
  
    const handleLogin = () => {
      console.log("Logging in with mobile number:", phoneNumber, "and password:", password);
      // Here you can add your login logic
      // For example, validate credentials and navigate to another screen if login is successful
    };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          onChangeText={(text) => setMobileNumber(text)}
          value={phoneNumber}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.modalButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupTextContainer}>
        <Text style={styles.blackText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.blueText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      {isAccountCreated && (
        <View style={styles.successMessageContainer}>
          <Text style={styles.successMessageText}>
            Account created successfully!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    paddingVertical: 10,
  },
  modalView: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
  },
  modalButton: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  signupTextContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  blackText: {
    fontSize: 16,
    color: "#333",
  },
  blueText: {
    fontSize: 16,
    color: "#2196F3",
    fontWeight: 600,
  },
  successMessageContainer: {
    backgroundColor: "#68d391", // Green color for success message
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    width: "100%",
    height: 60,
    display: "flex",
    justifyContent: "center",
  },
  successMessageText: {
    color: "#FFF", // White color for text
    fontSize: 16,
  },
});

export default Login;
