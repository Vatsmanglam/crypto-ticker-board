
import React from 'react';
import { useAppSelector } from '../store/hooks';
import { selectAllAssets } from '../store/cryptoSlice';
import { CryptoTableHeader } from './CryptoTableHeader';
import { CryptoTableRow } from './CryptoTableRow';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CryptoTable: React.FC = () => {
  const assets = useAppSelector(selectAllAssets);

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <CryptoTableHeader title="#" className="w-12 text-center" />
            <CryptoTableHeader title="Asset" className="min-w-[180px]" />
            <CryptoTableHeader title="Price" className="min-w-[120px]" />
            <CryptoTableHeader title="1h %" className="min-w-[100px]" />
            <CryptoTableHeader title="24h %" className="min-w-[100px]" />
            <CryptoTableHeader title="7d %" className="min-w-[100px]" />
            <CryptoTableHeader title="Market Cap" className="min-w-[150px] hidden md:table-cell" />
            <CryptoTableHeader title="Volume (24h)" className="min-w-[150px] hidden md:table-cell" />
            <CryptoTableHeader title="Circulating Supply" className="min-w-[180px] hidden lg:table-cell" />
            <CryptoTableHeader title="Max Supply" className="min-w-[120px] hidden lg:table-cell" />
            <CryptoTableHeader title="Last 7 Days" className="min-w-[120px] hidden lg:table-cell" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => (
            <CryptoTableRow key={asset.symbol} asset={asset} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CryptoTable;
