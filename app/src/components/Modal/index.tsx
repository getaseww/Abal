import React, { useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import { CustomModalPropType } from './util';

const CustomModal: React.FC<CustomModalPropType> = ({ title,width, open, handleCancel, handleOk, children, footer },) => {

  return (
    <>
      <Modal
        className="fixed-modal  text-white dark:text-boxdark z-50"
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
              // height: "70%"

            }}
          >
            {title}
          </div>
        }
        open={open}
        width={width!=undefined?width:1000}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          footer
        ]}
        // style={{ top: 20 }}
        styles={{ body: { maxHeight: '70vh', overflowY: 'auto',padding:"15px" } }}
      >
        {children}
      </Modal >
    </>
  );
};

export default CustomModal;