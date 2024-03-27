import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const Signup = ({ navigation }) => {
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = () => {
    if (
      !name.trim() ||
      !phoneNumber.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setErrorMessage("Please fill in all fields.");
      setErrorModalVisible(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Password and confirm password do not match.");
      setErrorModalVisible(true);
      return;
    }
    setModalVisible(true);

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbxWJb3psbwRmqD5CxZMOZNSupo7DYeHtxXiKCadmAREDP4oeFEweEPsQIQsQU0kXv9d/exec";
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("PHNumber", phoneNumber);
    formData.append("Password", password);

    fetch(scriptURL, { method: "POST", body: formData })
      .then((response) => {
        if (response.ok) {
          setIsAccountCreated(true);
          navigation.navigate("Login", { isAccountCreated: true, phoneNumber: phoneNumber, password: password });
          setModalVisible(false);
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .catch((error) => {
        Alert.alert("Error!", "Failed to submit data. Please try again later.");
        console.error("Error submitting data:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
        <Text style={styles.modalButtonText}>Sign up</Text>
      </TouchableOpacity>

      <View style={styles.signupTextContainer}>
        <Text style={styles.blackText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.blueText}>Login</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{errorMessage}</Text>
            {errorMessage === "Password and confirm password do not match." ||
            errorMessage === "Please fill in all fields." ? (
              <Pressable
                style={styles.modalButton}
                onPress={() => setErrorModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </Modal>
      <Modal 
  animationType="fade"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {}} // No action on modal close
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <ActivityIndicator size="large" color="#000" />
      <Text>Creating a Account...</Text>
    </View>
  </View>
</Modal>
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
  buttonContainer: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    paddingVertical: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    },
    modalContent: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
      elevation: 5, // For Android shadow
    },
  
});

export default Signup;
