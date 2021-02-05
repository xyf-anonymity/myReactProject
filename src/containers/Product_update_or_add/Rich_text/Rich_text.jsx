import React, { Component } from 'react';
import { EditorState, convertToRaw,ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './css/rich_text.css'


export default class RichText extends Component {
    state = {
        editorState: EditorState.createEmpty(),
    }

    //富文本编辑器中商品详细信息的数据回显，由父组件调用
    productDetailInfoBackToDraft = (html) => {
        const contentBlock = htmlToDraft(html)
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          this.setState({editorState})
        }
    }

    //搜集用户输入在富文本编辑器中的数据，由父组件调用
    getDescText = () => {
        const { editorState } = this.state;
        return draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }
    
    onEditorStateChange = (editorState) => {
        this.setState({editorState})
    }

    render() {
        const { editorState } = this.state;
        return (
        <div>
            <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
            />
        </div>
        );
    }
}