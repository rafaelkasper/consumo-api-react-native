import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Comment, Post } from "../types/Post";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/constants";

interface Props {
  post: Post;
}

const Card = ({ post }: Props) => {
  const [openComment, setOpenComments] = useState<boolean>(false);
  const [commentsList, setCommentsList] = useState<Comment[]>([]);

  const getComments = async () => {
    try {
      const response = await axios.get<Comment[]>(
        `${baseUrl}/comments?postId=${post.id}`
      );
      setCommentsList(response.data);
    } catch (error) {}
  };

  const handleOpen = async () => {
    if (!openComment) {
      await getComments();
    }
    setOpenComments(!openComment);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <TouchableOpacity onPress={handleOpen}>
        <AntDesign
          name="message1"
          size={30}
          color="#fff"
          style={{ marginBottom: 10 }}
        />
      </TouchableOpacity>
      {openComment && (
        <FlatList
          data={commentsList}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.comment}>
                {item.name} - {item.email}
              </Text>
              <Text style={styles.comment}>{item.body}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 10,
    borderColor: "#fff",
    borderWidth: 2,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 10,
  },
  body: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },
  comment: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
});

export default Card;
