import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'

const EmailForm = () => {
    const [mailerState, setMailerState] = useState({
        senderEmail: "",
        receiverEmail: "",
        subject: "",
        message:""
      });
      const submitEmail = async () => {
        console.log({ mailerState });
        const response = await fetch("http://localhost:3001/send", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ mailerState }),
        })
          .then((res) => res.json())
          .then(() => {
            setMailerState({
             senderEmail: "",
             receiverEmail: "",
             subject: "",
             message:""
            });
          });
      };
     
      return (
        <View style={styles.container}>
          <Text style={styles.label}>Sender Email:</Text>
          <TextInput
            style={styles.input}
            value={senderEmail}
            onChangeText={setSenderEmail}
            placeholder="Sender Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.label}>Receiver Email:</Text>
          <TextInput
            style={styles.input}
            value={receiverEmail}
            onChangeText={setReceiverEmail}
            placeholder="Receiver Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.label}>Subject:</Text>
          <TextInput
            style={styles.input}
            value={subject}
            onChangeText={setSubject}
            placeholder="Subject"
          />
          <Text style={styles.label}>Message:</Text>
          <TextInput
            style={[styles.input, styles.messageInput]}
            value={message}
            onChangeText={setMessage}
            placeholder="Message"
            multiline
            numberOfLines={4}
          />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      );
    };
    
   

export default EmailForm

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    label: {
      fontSize: 18,
      marginBottom: 8,
    },
    input: {
      height: 40,
      borderColor: '#ddd',
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 8,
    },
 
  
  });