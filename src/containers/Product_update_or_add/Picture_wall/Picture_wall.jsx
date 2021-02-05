import React, { Component } from 'react'
import { Upload, Modal,message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqDeleteProductPicture } from '../../../api'

//图片转 base64
function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}

message.config({
    duration: 1,
    maxCount: 1,
})


export default class PictureWall extends Component {

    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
    };
    
    //搜集上传的图片名，由父组件调用
    getPictureName = () => {
        const { fileList } = this.state
        let pictureArr = []
        fileList.forEach((itemObj) => {
            pictureArr.push(itemObj.name)
        })
        return pictureArr
    }

    handleCancel = () => this.setState({ previewVisible: false });
    
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };
    
    handleChange = ({ file, fileList }) => {
        if (file.status === 'done') {
            const {status,data,msg} = file.response
            if (status === 0) {
                const { name, url } = data
                fileList[fileList.length - 1].url = url
                fileList[fileList.length - 1].name = name
            } else message.error(msg)
        } else if (file.status === 'removed')  this.deletePicture(file.name) //删除图片
        this.setState({ fileList })
    }

    //修改商品时回显商品图片，由父组件调用
    pictureAgainShow = (pictureNameArr) => {
        let fileList = [...this.state.fileList]
        pictureNameArr.forEach((itemName) => {
            let pictureObj = {} 
            pictureObj.name = itemName
            pictureObj.url = `/upload/${itemName}`
            fileList.push(pictureObj)
        })
        this.setState({fileList})
    }

    //删除图片
    deletePicture = async (name) => {
        let { status, msg } = await reqDeleteProductPicture(name)
        if (status === 0) message.success('删除成功')
        else message.error(msg)
    }
    

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <div>
                <Upload
                    action="/manage/img/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    name="image"
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}