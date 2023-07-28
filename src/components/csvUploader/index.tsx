import React,{ useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudArrowUpIcon } from '@heroicons/react/20/solid';
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
      <div {...getRootProps()} className={`border-2 border-dashed rounded px-5 py-2 text-center transition-all bg-slate-50 border-primary-1 ${isDragActive ? "opacity-50" : ""}`}>
        <input {...getInputProps()} />
        <div className='flex flex-col justify-center items-center cursor-pointer'>
          <CloudArrowUpIcon className="text-primary-2 h-8 w-8  mb-1"/>
          <p>ファイルをドロップ or クリックしてファイル選択</p>
        </div>
      </div>
    </>
  );
};

export default CsvUploader;
