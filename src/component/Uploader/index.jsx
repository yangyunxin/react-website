import React from 'react';
import { Upload, Icon, Modal, message } from 'antd';

export default class UploadImage extends React.PureComponent {
  static defaultProps = {
    max: 1,
    noRemove: false,
    noAdd: false,
  }

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    uploadParams: {},
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps && nextProps.value !== this.props.value && nextProps.value instanceof Array) {
      this.setState({ fileList: nextProps.value.map((v, index) => ({ uid: index, url: v })) });
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreivew = (filter) => {
    this.setState({
      previewImage: filter.url || filter.thumbUrl,
      previewVisible: true,
    });
  }

  beforeUpload = async (file) => {
    const isLt10M = file.size / 1024 / 1024 < 10;
    const isType = /image\/*/.test(file.type);
    if (!isLt10M) {
      message.error('上传图片小于10MB!');
    }
    if (!isType) {
      message.error('请上传jpg, png, jpeg图片类型');
    }
    return isType && isLt10M;
  }

  handleChange = ({ fileList }) => {
    const { onChange } = this.props;
    const val = fileList.filter(item => item.response && item.response.code === 0).map(item => (item.response.data));
    this.setState({ fileList, val }, () => {
      if (onChange && this.state.val.length === fileList.length) {
        onChange(val);
      }
    });
  }

  render() {
    const {
      previewVisible,
      previewImage,
      fileList,
      uploadParams
    } = this.state;
    const { noRemove, noAdd, type } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="antd-upload-text">上传</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          headers={{ 'Authorization': localStorage.getItem('Authorization') || 'Basic cGlnOnBpZw==' }}
          name="file"
          action="/api/goods/upload/up"
          listType="picture-card"
          fileList={fileList}
          data={{ ...uploadParams, type }}
          onPreview={this.handlePreivew}
          onChange={this.handleChange}
          beforeUpload={this.beforeUpload}
          onRemove={() => {
            return new Promise((resolve) => {
              noRemove ? resolve(false) : resolve(true)
            })
          }}
        >
          {fileList.length >= this.props.max || noAdd ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}
