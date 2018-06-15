import { StyleSheet } from 'react-native';

export default function GenericButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.baseBottom}>
      <Text style={[styles.baseText, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  baseText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '500',
    paddingTop: 8,
    paddingBottom: 8
  },
  baseBottom: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    marginLeft: 5,
    marginRight: 5
  },
  reset: {
    textAlign: 'center',
    margin: 20
  }
})
