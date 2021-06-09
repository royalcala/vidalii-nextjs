import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useForm, Controller } from "react-hook-form";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        container: {
            maxHeight: 440,
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '25ch',
        },
    }),
);


export default function List(props: {
    api: string,
    head: {
        label: string,
        filter: (value: any) => object
    }[],
    row: (document: any, index: number) => JSX.Element,
    initialDocs: any[],
    totalRows: number
}) {
    const { control, handleSubmit, getValues } = useForm();
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [docs, setDocs] = React.useState(null)
    const [filter, setFilter] = React.useState({})

    useEffect(() => {
        async function fetchMyAPI() {
            const resp = await fetch(props.api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    limit: rowsPerPage,
                    skip: page * rowsPerPage,
                    filter
                })
            })
            const json = await resp.json();
            setDocs(json)
        }

        fetchMyAPI()
    }, [filter,page,rowsPerPage])

    const handleChangePage =  (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage =  (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const onFilter = async () => {
        const mongoFilter = Object.entries(getValues()).map(
            ([key, value], index) => {
                if (value === '')
                    return null
                else
                    return props.head[index].filter(value)
            }
        ).filter(
            (value) => value !== null
        ).reduce(
            (prev, current) => ({
                ...prev,
                ...current
            }), {}
        )
        console.log(mongoFilter)
        setFilter(mongoFilter || {})        
        // filter = mongoFilter || {}
        // await fetchRows()
    }


    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {props.head.map(
                                ({ label }, index) => <TableCell
                                    key={index}
                                    // align="right"
                                    style={{ minWidth: 170 }}
                                >
                                    <Controller
                                        name={label}
                                        control={control}
                                        defaultValue=""
                                        render={({ field, fieldState: { error } }) => <TextField
                                            {...field}
                                            label={label}
                                            className={classes.textField}
                                            onKeyDown={(e: any) => {
                                                if (e.key === 'Enter') {
                                                    onFilter()
                                                }
                                            }}
                                        />}
                                    />
                                </TableCell>
                            )}
                            {/* {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))} */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {docs === null
                            ? props.initialDocs.map(
                                (doc, index) => {
                                    return props.row(doc, index)
                                }
                            )
                            //@ts-ignore
                            : docs.map(
                                (doc: any, index: number) => {
                                    return props.row(doc, index)
                                }
                            )

                        }
                        {/* {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })} */}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[25, 50, 100]}
                component="div"
                count={props.totalRows}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />

        </Paper>
    );
}