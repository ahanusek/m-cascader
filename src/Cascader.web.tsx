import * as React from 'react';
import classnames from 'classnames';
import Picker from 'rmc-picker/lib/Picker.web';
import { CascaderProps } from './CascaderTypes';
import CascaderMixin from './CascaderMixin';

const Cascader = React.createClass<CascaderProps, any>({
  mixins: [CascaderMixin],

  getDefaultProps() {
    return {
      prefixCls: 'rmc-cascader',
      pickerPrefixCls: 'rmc-picker',
      data: [],
      disabled: false,
    };
  },

  render() {
    const props = this.props;
    const {
      prefixCls, pickerPrefixCls,
      className, rootNativeProps,
      disabled, pickerItemStyle,
    } = props;
    const value = this.state.value;
    const childrenTree = this.getChildrenTree();
    const cols = this.getColArray().map((v, i) => {
      // do not remove ${prefixCls}-main-item
      return (
        <div key={i} className={`${prefixCls}-item ${prefixCls}-main-item`}>
          <Picker
            itemStyle={pickerItemStyle}
            disabled={disabled}
            prefixCls={pickerPrefixCls}
            selectedValue={value[i]}
            onValueChange={this.onValueChange.bind(this, i)}
          >
            {childrenTree[i] || []}
          </Picker>
        </div>
      );
    });
    return (
      <div {...rootNativeProps} className={classnames(className, prefixCls)}>
        {cols}
      </div>
    );
  },
});

export default Cascader;
