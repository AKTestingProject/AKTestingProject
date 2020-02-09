import React from 'react';

export default props => {
    const smallUrl = `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;
    const bigUrl = `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;
    return (
    	<div>
	    	<p style={{fontSize: '20px' , margin: '50px 0 10px', textAlign: 'center'}}><b>Please choose data volume:</b></p>  
	        <div style={{display:'flex', justifyContent:'center', padding: '0'}}>
	            <button onClick={()=>props.onSelect(smallUrl, 'small')} className="btn btn-success mr-2">Small data</button>
	            <button onClick={()=>props.onSelect(bigUrl, 'big')} className="btn btn-danger ml-2">Big data</button>
	        </div>
        </div>
    )
}