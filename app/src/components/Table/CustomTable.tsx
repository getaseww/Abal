import React from 'react';
import { Table } from 'antd';
import { CustomTablePropType } from '../../@types/Table';


const CustomTable: React.FC<CustomTablePropType> = ({ rowKey,rowSelection, column, data, handleChange, onError, pagination }) => {

  onError && onError();

  return (
    <>
      <div >
        <Table
          className="bg-white dark:bg-boxdark"
          columns={column}
          rowKey={rowKey}
          dataSource={data?.map((item: any, index: number) => ({ ...item, key: index }))}
          onChange={handleChange}
          pagination={pagination == undefined ? {} : false}
          rowSelection={rowSelection}
          scroll={{ x: 600 }}
        />
      </div>
    </>
  );
};

export default CustomTable;