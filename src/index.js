// @flow

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import autobind from 'class-autobind';

import {trimString, transformStringToArray} from './utils';

const DEFAULT_MAX_PIN_LENGTH = 4;
const DEFAULT_KEYBOARD_TYPE = 'numeric';

type Props = {
  autofocus?: boolean,
  autoClear?: boolean,
  backspaceOnly?: boolean,
  onChangeText: string => void,
  maxLength?: number,
  keyboardType?: string,
  containerStyle?: StyleSheet,
  textStyle?: StyleSheet,
  onInputFinish?: (code: string) => void,
  onSuccess?: () => void,
  onFail?: () => void,
};

type State = {
  code: string,
};

export default class InputOTP extends Component<Props, State> {
  _textInput: React$Node;

  constructor() {
    super(...arguments);
    autobind(this);
    this.state = {
      code: '',
    };
  }

  componentDidMount() {
    this._textInput && this.props.autofocus && this._focus();
  }

  render() {
    let {code} = this.state;
    let {
      autofocus,
      maxLength,
      keyboardType,
      onInputFinish,
      autoClear,
      ...otherProps
    } = this.props;
    let verificationCode = transformStringToArray(code, maxLength);
    return (
      <View style={styles.root}>
        <TextInput
          autoFocus={autofocus}
          keyboardType={keyboardType || DEFAULT_KEYBOARD_TYPE}
          maxLength={maxLength || DEFAULT_MAX_PIN_LENGTH}
          value={code}
          style={styles.textField}
          caretHidden={true}
          onChangeText={this._onChangeText}
          ref={node => {
            this._textInput = node;
          }}
          {...otherProps}
        />
        <View style={styles.container}>
          {verificationCode.map((code, i) => this._renderEachCode(code, i))}
        </View>
      </View>
    );
  }

  _renderEachCode(code: string, index: number) {
    let {containerStyle, textStyle} = this.props;
    return (
      <TouchableOpacity
        key={index}
        onPress={() => this._onCodeWrapperPress(index)}
      >
        <View style={[styles.eachCodeWrapper, containerStyle]}>
          <Text style={[styles.text, textStyle]}>{code}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _onCodeWrapperPress(index: number) {
    let {backspaceOnly} = this.props;
    let {code} = this.state;
    !backspaceOnly && this._onChangeText(trimString(code, index));
    this._focus();
  }

  _onChangeText(code: string) {
    let {maxLength} = this.props;
    let trimmedCode = trimString(code, maxLength);
    this._onInputEnd(code, trimmedCode);
    this.setState({
      code: trimmedCode,
    });
  }

  _onInputEnd(code: string, trimmedCode: string) {
    let {onInputFinish, onSuccess, onFail, autoClear} = this.props;
    if (code.length === 4) {
      let otpHandler = onInputFinish && onInputFinish(trimmedCode);
      if (otpHandler && otpHandler.then) {
        otpHandler
          .then(() => {
            if (this.state.code === trimmedCode) {
              onSuccess && onSuccess();
              autoClear && this.setState({code: ''});
            }
          })
          .catch(onFail);
      }
    }
  }

  _focus() {
    // $FlowFixMe
    this._textInput && this._textInput.focus();
  }

  getVerificationCode() {
    return this.state.code;
  }

  resetVerificationCode(code: string) {
    this.setState({
      code,
    });
  }
}

let styles = StyleSheet.create({
  root: {
    position: 'relative',
    zIndex: 1,
  },
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  text: {
    fontSize: 14,
    color: '#A5AEB6',
    fontWeight: '100',
    fontFamily: 'PT Sans',
  },
  eachCodeWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    padding: 10,
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 5,
    borderColor: '#E6E9EE',
    borderRadius: 3,
    backgroundColor: '#F7F7FA',
    bottom: 10,
  },
  textField: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    opacity: 0,
    letterSpacing: 25,
  },
});
