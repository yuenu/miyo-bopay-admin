import React from "react";

import { Modal } from "antd";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-python";
import "prismjs/themes/prism.css";

const CodeEditor = ({ visible, code, onOk, onChange, onCancel, loading }) => {
  return (
    <Modal
      width={700}
      title="Edit Code"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      cancelText="取消"
      okText="送出"
      confirmLoading={loading}
    >
      <Editor
        value={code}
        onValueChange={onChange}
        highlight={val => highlight(val, languages.py)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
    </Modal>
  );
};

export default CodeEditor;
