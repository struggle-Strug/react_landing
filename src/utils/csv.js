import Papa from 'papaparse';

export const DownloadCSV = (data) => {
  const csv = Papa.unparse(data);
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'template.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};