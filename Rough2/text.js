<TextInput
  placeholder="Reply"
  keyboardType="email-address"
  placeholderTextColor={colors.login.headingtext2}
  onChangeText={text => setReplyInput(text)}
  value={replyinput}
  cursorColor={colors.login.headingtext2}
  style={{color: colors.login.headingtext2, flex: 1}}
  autoFocus={true}
  onSubmitEditing={handleaddreply}
  blurOnSubmit={false}
  returnKeyType="send"
/>;
