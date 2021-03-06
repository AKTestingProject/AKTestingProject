import React from 'react';
import ReactPaginate from 'react-paginate';
import LodashSort from 'lodash';
import Loader from './Loader/Loader';
import Table from './Table/Table';
import DetailRowView from './DetailRowView/DetailRowView';
import ModeSelector from './ModeSelector/ModeSelector';
import TableSearch from './TableSearch/TableSearch';
import InputForm from './InputForm/InputForm';
import './App.css'; 

class App extends React.Component {
  
  state ={
    isModeSelected: false,
    modeType: '', // 'big' or 'small' data
    isLoading: false,
    data: [],
    search: '',
    sort: 'asc',  // or 'desc'
    sortField: 'id', // поле по умолчанию
    row: null,
    currentPage: 0
  }

   async fetchData(url) {
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
       this.setState({
        isLoading: false,
        data: LodashSort.orderBy(data, this.state.sortField, this.state.sort)
      })
    } else {
      console.log('Ошибка HTTP:'+ response.status)
    }
  }

  onSort = sortField => {
    
    const cloneData = this.state.data.concat()
    const sortType = this.state.sort === 'asc' ? 'desc' : 'asc'
    const orderedData = LodashSort.orderBy(cloneData, sortField, sortType)

    this.setState({
      data: orderedData,
      sort: sortType,
      sortField
    })
  }
  
  modeSelectHandler = (url, dataType) => {
    this.setState({
      isModeSelected: true,
      modeType: dataType,
      isLoading: true
    });
    this.fetchData(url, dataType)
  }

  onRowSelect = row => (
    this.setState({row})
  )

  pageChangeHandler = ({selected}) => (
    this.setState({currentPage: selected})
  )

  searchHandler = search => {
    this.setState({search, currentPage: 0})
  }

  getFilteredData(){
    const {data, search} = this.state
    if (!search) {
      return data
    }
   let result = data.filter(item => {
     return (
       item["firstName"].toLowerCase().includes(search.toLowerCase()) ||
       item["lastName"].toLowerCase().includes(search.toLowerCase()) ||
       item["email"].toLowerCase().includes(search.toLowerCase())
     );
     });
     if(!result.length){
       result = this.state.data
     }
      return result
  }

  render() {
    const pageSize = 50;
    if(!this.state.isModeSelected){
      return (
        <div className="container">
          <ModeSelector onSelect={this.modeSelectHandler}/>
        </div>
      )
    }
    const filteredData = this.getFilteredData();
    const pageCount = Math.ceil(filteredData.length / pageSize)
    const displayData = LodashSort.chunk(filteredData, pageSize)[this.state.currentPage]
    return (
      <>
          <div className="container">
          {
            this.state.isLoading 
            ? <Loader />
            : <React.Fragment>
                <TableSearch 
                onSearch={this.searchHandler} 
                dataType = {this.state.modeType}
                />
                <InputForm 
                data={this.state.data}
                />
                <Table 
                data={displayData}
                onSort={this.onSort}
                sort={this.state.sort}
                sortField={this.state.sortField}
                onRowSelect={this.onRowSelect}
                />
              </React.Fragment>
          }
            {
            this.state.data.length > pageSize
            ? <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.pageChangeHandler}
              containerClassName={'pagination'}
              activeClassName={'active'}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              nextClassName="page-item"
              previousLinkClassName="page-link"
              nextLinkClassName="page-link"
              forcePage={this.state.currentPage}
              /> 
            : null
          } 
           {
              this.state.row ? <DetailRowView person={this.state.row} /> : null
            }
          </div>
      </>
    );
  }
}

export default App;


