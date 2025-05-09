
import React from 'react';
import { TableHead } from "@/components/ui/table";
import { cn } from '@/lib/utils';

interface CryptoTableHeaderProps {
  title: string;
  className?: string;
}

export const CryptoTableHeader: React.FC<CryptoTableHeaderProps> = ({ 
  title,
  className
}) => {
  return (
    <TableHead className={cn("font-medium text-sm text-muted-foreground py-4", className)}>
      {title}
    </TableHead>
  );
};
