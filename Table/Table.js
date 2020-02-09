import React from 'react';
import ArrowUp from './ArrowUp.png';
import ArrowDown from './ArrowDown.png';

export default props => (
    <table className="table table-hover">
        <thead>
            <tr className = 'table-info'>
                <th onClick={props.onSort.bind(null, 'id')}>
                ID {props.sortField === 'id' ? <img src={props.sort === 'asc' ? ArrowDown : ArrowUp} alt="Arrow"/> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'firstName')}>
                First Name {props.sortField === 'firstName' ? <img src={props.sort === 'asc' ? ArrowDown : ArrowUp} alt="Arrow"/> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'lastName')}>
                Last Name Last Name {props.sortField === 'lastName' ? <img src={props.sort === 'asc' ? ArrowDown : ArrowUp} alt="Arrow"/> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'email')}>
                E-mail {props.sortField === 'email' ? <img src={props.sort === 'asc' ? ArrowDown : ArrowUp} alt="Arrow"/> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'phone')}>
                Phone {props.sortField === 'phone' ? <img src={props.sort === 'asc' ? ArrowDown : ArrowUp} alt="Arrow"/> : null}
                </th>
            </tr>
        </thead>
        <tbody>
            { props.data.map(item => (
                <tr key={item.id + item.firstName} onClick={props.onRowSelect.bind(null, item)}>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                </tr>
            ))}
        </tbody>
    </table>
)