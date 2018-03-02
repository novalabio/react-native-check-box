/**
 * react-native-check-box
 * Checkbox component for react native, it works on iOS and Android
 * https://github.com/crazycodeboy/react-native-check-box
 * Email:crazycodeboy@gmail.com
 * Blog:http://www.devio.org
 * @flow
 */

import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ViewPropTypes,
  TouchableHighlight
} from 'react-native'

export default class CheckBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChecked: this.props.isChecked,
    }

    this.getRef = this.getRef.bind(this)
    this.getCheckStatus = this.getCheckStatus.bind(this)
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.isChecked !== this.state.isChecked)
      this.setState({ isChecked: nextProps.isChecked })
  }

  onPress = () => {
    this.setState({ isChecked: !this.state.isChecked })
    this.props.onPress && this.props.onPress()
  }

  getCheckStatus = () => this.state.isChecked

  getRef(r) {
    this.checkBox = r
  }

  renderLeft = () => {
    if (this.props.leftTextView)
      return this.props.leftTextView
    if (!this.props.leftText)
      return null

    return <Text style={[styles.leftText, this.props.leftTextStyle]}>{this.props.leftText}</Text>
  }

  renderRight = () => {
    if (this.props.rightTextView)
      return this.props.rightTextView

    if (!this.props.rightText)
      return null

    return <Text style={[styles.rightText, this.props.rightTextStyle]}>{this.props.rightText}</Text>
  }

  renderImage() {
    if (this.props.isIndeterminate)
      return this.props.indeterminateImage ? this.props.indeterminateImage : this.genCheckedImage()

    if (this.state.isChecked)
      return this.props.checkedImage ? this.props.checkedImage : this.genCheckedImage()
    
    return this.props.unCheckedImage ? this.props.unCheckedImage : this.genCheckedImage()
  }

  genCheckedImage = () => {
    let source = this.props.isIndeterminate ? require('./img/ic_indeterminate_check_box.png') : this.state.isChecked ?
                                              require('./img/ic_check_box.png') : require('./img/ic_check_box_outline_blank.png')

    return <Image source={source} style={{tintColor: this.props.checkBoxColor}} />
  }

  render() {
    return (
      <TouchableHighlight
        ref={this.getRef}
        onPress={this.onPress}
        style={this.props.style}
        underlayColor='transparent'
        disabled={this.props.disabled}>
        <View style={styles.container}>
          {this.renderLeft()}
          {this.renderImage()}
          {this.renderRight()}
        </View>
      </TouchableHighlight>
    )
  }
}

CheckBox.defaultProps = {
  isChecked: false,
  leftTextStyle: {},
  rightTextStyle: {},
  isIndeterminate: false,
}

CheckBox.propTypes = {
  ...(ViewPropTypes || View.PropTypes),
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  leftText: PropTypes.string,
  rightText: PropTypes.string,
  leftTextView: PropTypes.element,
  leftTextStyle: PropTypes.object,
  checkedImage: PropTypes.element,
  checkBoxColor: PropTypes.string,
  rightTextView: PropTypes.element,
  rightTextStyle: PropTypes.object,
  unCheckedImage: PropTypes.element,
  isChecked: PropTypes.bool.isRequired,
  isIndeterminate: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftText: {
        flex: 1,
    },
    rightText: {
        flex: 1,
        marginLeft: 10
    }
})
