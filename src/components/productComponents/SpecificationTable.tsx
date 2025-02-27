
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

function createData(
  name: string,
  calories: string,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Marca', 'Apple', 5126, 24, 4.0),
  createData('Fabricante', 'Apple', 9.0, 37, 4.3),
  createData('Série', '1M5445454J8545825', 45, 24, 6.0),
  createData('Certificação', 'Anatel', 3.7, 67, 4.3),
  createData('Cor', 'Preta Brilhante', 16.0, 49, 3.9),
];

export default function SpecificationTable() {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.calories}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}