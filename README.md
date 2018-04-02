# react-otp
Verification input field for React Native and React (using `react-native-web`).

![Alt Text](https://media.giphy.com/media/1vZ8VEQysWtXaJzmm1/giphy.gif)

### Install
```
yarn add react-otp
npm install react-otp
```

### Properties
| Props          | Type                      | Description                                   | Defaults  |
|----------------|---------------------------|-----------------------------------------------|-----------|
| autofocus      | boolean                   | auto focus input on mounts                    | true      |
| autoClear      | boolean                   | clears input after onSuccess/onFail           | false     |
| backspaceOnly  | boolean                   | input behavior                                | false     |
| maxLength      | number                    | length of OTP/PIN/code                        | 4         |
| keyboardType   | string                    | default | numeric | email-address | phone-pad | 'numeric' |
| containerStyle | StyleSheet                | -                                             | -         |
| textStyle      | StyleSheet                | -                                             | -         |
| onInputFinish  | (code: string) => ?Promise| handler after users fill all slots            | -         |
| onSuccess      | () => void                | handler after successful attempts             | -         |
| onFailure      | () => void                | handler after failure                         | -         |

> `onSuccess()` and `onFail()` works only if `onInputFinish()` returns a `Promise`, and are invoked depending on the result (resolved or rejected).

### Ref Properties
You can also set a ref and access the following methods:
- `getVerificationCode()`: returns the current code inputted by user
- `resetVerificationCode()`: resets input

Peace :v:
