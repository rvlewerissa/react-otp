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
  value: string,
  backspaceOnly?: boolean,
  onChangeText: string => void,
  maxLength?: number,
  keyboardType?: string,
  containerStyle?: StyleSheet,
  textStyle?: StyleSheet,
};

export default class InputOTP extends Component<Props> {
  _textInput: React$Node;

  constructor() {
    super(...arguments);
    autobind(this);
  }

  render() {
    let {value, maxLength, keyboardType} = this.props;
    let verificationCode = transformStringToArray(value, maxLength);
    return (
      <View style={styles.root}>
        <TextInput
          autoFocus
          keyboardType={keyboardType || DEFAULT_KEYBOARD_TYPE}
          maxLength={maxLength || DEFAULT_MAX_PIN_LENGTH}
          value={value}
          style={styles.textField}
          caretHidden={true}
          ref={node => {
            this._textInput = node;
          }}
          onChangeText={this._onChangeText}
        />
        <View style={styles.container}>
          {verificationCode.map((code, index) =>
            this._renderEachCode(code, index),
          )}
        </View>
      </View>
    );
  }

  _renderEachCode(code: string, i: number) {
    let {containerStyle} = this.props;
    return (
      <TouchableOpacity key={i} onPress={() => this._onCodeWrapperPress(i)}>
        <View style={containerStyle || styles.eachCodeWrapper}>
          <Text style={styles.text}>{code}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _onCodeWrapperPress(index: number) {
    let {value, backspaceOnly, onChangeText} = this.props;
    !backspaceOnly && onChangeText(trimString(value, index));
    this._focus();
  }

  _onChangeText(verificationCode: string) {
    let {onChangeText, maxLength} = this.props;
    onChangeText(trimString(verificationCode, maxLength));
  }

  _focus() {
    // $FlowFixMe
    this._textInput && this._textInput.focus();
  }
}

let styles = StyleSheet.create({
  root: {
    position: 'relative',
    zIndex: -1,
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
    zIndex: 0,
  },
});
