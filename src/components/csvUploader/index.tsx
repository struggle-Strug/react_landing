import React,{ useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import Papa from 'papaparse';

const CsvUploader = ({uploadData}) => {
  const [csvData, setCsvData] = useState<Array<Record<string, string>>>([])
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      Papa.parse(file, {
        complete: (result) => {
          setCsvData(result.data as Array<Record<string, string>>)
        },
        header: true
      })
    })
  }, [])
  useEffect(() => {
    const cleanData = csvData.slice(1)
    uploadData(cleanData)
  },[csvData])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()} className={`border-2 border-dashed rounded p-5 text-center transition-all bg-slate-50 border-main max-w-lg mx-auto ${isDragActive ? "opacity-50" : ""}`}>
        <input {...getInputProps()} />
        <div className='flex flex-col justify-center items-center cursor-pointer'>
          <CloudArrowUpIcon className="text-main h-24 w-24 mb-1 font-bold"/>
          <p className='font-bold text-main'>ファイルをここにドロップ </p>
          <p className='font-bold text-main'> or </p>
          <p className='font-bold text-main'>枠内をクリックしてファイル選択</p>
        </div>
      </div>
    </>
  );
};

export default CsvUploader;
