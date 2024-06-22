
import { Button } from 'antd';
import * as XLSX from 'xlsx';


interface TypeProp {
    data: any,
    file_name: string,
    sheet_name: string,
    button_type?: "link" | 'text' | 'dashed' | "default" | 'primary',
    is_text?: boolean
}

const ExportToExcel: React.FC<TypeProp> = ({ button_type, is_text, data, file_name, sheet_name }) => {

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const columnWidth = [{ wch: 15 }];
        ws['!cols'] = columnWidth;

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheet_name);
        XLSX.writeFile(wb, file_name);
    };




    return (
        <>
            <Button
                type={button_type ?? "default"}
                onClick={exportToExcel}
                className='flex items-center  bg-[#1F677D] text-white my-2'
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="12"
                    viewBox="0 0 384 512"
                    className='mr-3'
                >
                    <path fill='#ffffff' d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM155.7 250.2L192 302.1l36.3-51.9c7.6-10.9 22.6-13.5 33.4-5.9s13.5 22.6 5.9 33.4L221.3 344l46.4 66.2c7.6 10.9 5 25.8-5.9 33.4s-25.8 5-33.4-5.9L192 385.8l-36.3 51.9c-7.6 10.9-22.6 13.5-33.4 5.9s-13.5-22.6-5.9-33.4L162.7 344l-46.4-66.2c-7.6-10.9-5-25.8 5.9-33.4s25.8-5 33.4 5.9z" /></svg>
                Export To Excel
            </Button>
        </>
    );
};

export default ExportToExcel;
