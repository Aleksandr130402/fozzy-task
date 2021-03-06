import { Fragment, useState, useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import tableData from './mock/table-data';
import { Divider } from '@material-ui/core';

import Popup from './components/Popup';
import NewWindow from './components/NewWindow';

const years = [2017, 2018, 2019];

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
});

function createData(name, params) {
  console.log(params)
  return { name, params };
}

function getValuesForYears(regionName) {
  const values = [];

  const currentRegion = tableData[regionName];
  
  years.forEach(item => {
    if(Object.keys(currentRegion.G).includes(item.toString())) {
      values.push(currentRegion.G[item])
    } else {
      values.push({
				XX: {
					value: 0,
					dateRelease: '-'
				},
				YY: {
					value: 0,
					dateRelease: '-'
				},
				ZZ: {
					value: 0,
					dateRelease: '-'
				}
			})
    }
  }) 

  return values;
}

const rows = [
  createData('Kyivska', getValuesForYears('Kyivska')),
  createData('Odeska', getValuesForYears('Odeska')),
  createData('Lvivska', getValuesForYears('Lvivska'))
];

const App = () => {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true),[]);
  const close = useCallback(() => setOpen(false),[]);

  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell rowSpan={2}>regions</TableCell>
            {years.map((year, key) => (
              <TableCell key={key} align="center" colSpan={3}>
                {year}            
              </TableCell> 
            ))}                    
          </TableRow>
          <TableRow>
            <TableCell>xx</TableCell>
            <TableCell>yy</TableCell>
            <TableCell>zz</TableCell>
            <TableCell>xx</TableCell>
            <TableCell>yy</TableCell>
            <TableCell>zz</TableCell>
            <TableCell>xx</TableCell>
            <TableCell>yy</TableCell>
            <TableCell>zz</TableCell>
          </TableRow>       
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return(
              <TableRow key={row.name} onClick={open}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                {row.params.map((param, key) => (         
                  <Fragment key={key}>
                    <TableCell>{param.XX.value}<Divider/>{param.XX.dateRelease}</TableCell>
                    <TableCell>{param.YY.value}<Divider/>{param.XX.dateRelease}</TableCell>
                    <TableCell>{param.ZZ.value}<Divider/>{param.XX.dateRelease}</TableCell>
                  </Fragment>                
                ))}            
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
    {
      isOpen &&
      <NewWindow close={close}>
        <Popup close={close}/>
      </NewWindow>
    }
    </>
  )
}

export default App;
