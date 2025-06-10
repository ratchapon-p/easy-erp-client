import React from 'react';
import { Button, Modal } from 'antd';

const AlertModal = ({ message, onClose }) => {
  return (
    <Modal
      open={!!message}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
      title="Warning"
      width={600}
    >
      <p>{message}</p>
      <div style={{ textAlign: 'right' }}>
        <Button type='primary' onClick={onClose} style={{ padding: '6px 12px' }}>OK</Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
