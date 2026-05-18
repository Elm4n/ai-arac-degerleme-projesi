import { Card } from '@/app/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';

interface DecisionRow {
  feature: string;
  analysis: string;
  priceImpact: string;
  dataSource: string;
}

interface DecisionTableProps {
  data: DecisionRow[];
}

export function DecisionTable({ data }: DecisionTableProps) {
  return (
    <Card className="p-6 shadow-sm">
      <h3 className="text-lg font-normal text-gray-900 mb-4">Decision Support Analysis</h3>
      
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium text-gray-700">Feature</TableHead>
              <TableHead className="font-medium text-gray-700">Analysis</TableHead>
              <TableHead className="font-medium text-gray-700">Price Impact</TableHead>
              <TableHead className="font-medium text-gray-700">Data Source</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-normal text-gray-900">{row.feature}</TableCell>
                <TableCell className="text-gray-700">{row.analysis}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm ${
                    row.priceImpact.startsWith('-') 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {row.priceImpact}
                  </span>
                </TableCell>
                <TableCell className="text-gray-600">{row.dataSource}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
